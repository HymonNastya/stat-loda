import express from 'express';
import { Sequelize } from 'sequelize';
import AdminJS from 'adminjs';
import AdminJSExpress from '@adminjs/express';
import AdminJSSequelize from '@adminjs/sequelize';
import session from 'express-session';
import bcrypt from 'bcrypt';
import initModels from './models/index.js';
import path from 'path';

const app = express();

// Жорстко прописуємо шлях до папки public
const publicPath = 'C:/Users/user/Desktop/stat_main/public';

const sequelize = new Sequelize('loda', 'myuser', '94654', {
  host: 'localhost',
  dialect: 'mysql',
  logging: false,
});

const models = initModels(sequelize);

AdminJS.registerAdapter(AdminJSSequelize);

const adminJs = new AdminJS({
  databases: [sequelize],
  rootPath: '/admin',
  resources: [
    {
      resource: models.User,
      options: {
        properties: {
          password: { isVisible: false },
          pass: { isVisible: false },
        },
        actions: {
          new: {
            before: async (request) => {
              if (request.payload?.password) {
                request.payload = {
                  ...request.payload,
                  pass: await bcrypt.hash(request.payload.password, 10),
                  password: undefined,
                };
              }
              return request;
            },
          },
        },
      },
    },
    ...Object.entries(models)
      .filter(([name]) => name !== 'User' && typeof models[name] === 'function')
      .map(([name, model]) => ({
        resource: model,
        options: {
          properties: {
            createdAt: { isVisible: false },
            updatedAt: { isVisible: false },
          },
          actions: {
            list: { isAccessible: ({ currentAdmin }) => currentAdmin?.role === 'admin' },
            edit: { isAccessible: ({ currentAdmin }) => currentAdmin?.role === 'admin' },
            delete: { isAccessible: ({ currentAdmin }) => currentAdmin?.role === 'admin' },
            new: { isAccessible: ({ currentAdmin }) => currentAdmin?.role === 'admin' },
          },
        },
      })),
  ],
  branding: {
    companyName: 'Loda Stat Admin',
    softwareBrothers: false,
  },
});

const adminRouter = AdminJSExpress.buildAuthenticatedRouter(
  adminJs,
  {
    authenticate: async (email, password) => {
      const user = await models.User.findOne({ where: { email } });
      if (user && (await bcrypt.compare(password, user.pass))) {
        return { email: user.email, role: user.role };
      }
      return null;
    },
    cookieName: 'adminjs',
    cookiePassword: 'long-secret-password',
  },
  null,
  {
    resave: false,
    saveUninitialized: true,
    secret: 'long-secret-password',
  }
);

app.use(session({
  secret: 'long-secret-password',
  resave: false,
  saveUninitialized: true,
}));

// Віддаємо статичні файли з папки public
app.use(express.static(publicPath));

// Головна сторінка - віддаємо index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(publicPath, 'index.html'));
});

// Підключаємо панель адміністратора
app.use(adminJs.options.rootPath, adminRouter);

const start = async () => {
  try {
    await sequelize.authenticate();
    console.log('🟢 DB connected');
    await sequelize.sync({ alter: true });

    app.listen(3000, () => {
      console.log('🚀 Server started on http://localhost:3000');
      console.log(`AdminJS доступний на http://localhost:3000${adminJs.options.rootPath}`);
    });
  } catch (err) {
    console.error('❌ DB connection error:', err);
  }
};

start();
