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

app.get('/api/communities', async (req, res) => {
  try {
    const communities = await models.Community.findAll({
      include: {
        model: models.District,
        attributes: ['name'], // лише назва району
      },
      order: [['name', 'ASC']], // сортування за назвою громади
    });

    res.json(communities);
  } catch (error) {
    console.error('❌ Помилка при отриманні громад:', error);
    res.status(500).json({ error: 'Не вдалося отримати громади' });
  }
});


app.get('/api/community/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const community = await models.Community.findByPk(id, {
      include: {
        model: models.District,
        attributes: ['name'],
      }
    });

    if (!community) return res.status(404).json({ error: 'Community not found' });

    res.json({
      id: community.id,
      name: community.name,
      area_km2: community.area_km2,
      num_cities: community.num_cities,
      num_villages: community.num_villages,
      num_settlements: community.num_settlements,
      district: community.district?.name || null
    });
  } catch (error) {
    console.error('❌ Community API error:', error);
    res.status(500).json({ error: 'Error fetching community data' });
  }
});


app.get('/api/districts', async (req, res) => {
  try {
    const districts = await models.District.findAll({
      order: [['name', 'ASC']],
      attributes: [
        'id',
        'name',
        'description',
        'website_url',
        'facebook_url',
        'area_km2',
        'num_settlements',
        'num_cities',
        'num_villages',
        'num_communities',
      ],
    });
    res.json(districts);
  } catch (error) {
    console.error('❌ Помилка при отриманні районів:', error);
    res.status(500).json({ error: 'Не вдалося отримати райони' });
  }
});

// API для одного району по id (опціонально, якщо треба деталізація)
app.get('/api/district/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const district = await models.District.findByPk(id);

    if (!district) return res.status(404).json({ error: 'District not found' });

    res.json(district);
  } catch (error) {
    console.error('❌ Помилка при отриманні району:', error);
    res.status(500).json({ error: 'Помилка при отриманні району' });
  }
});

// API для списку наборів даних (datasets)
app.get('/api/datasets', async (req, res) => {
  try {
    const datasets = await models.Dataset.findAll({
      order: [['created_at', 'DESC']],
      attributes: [
        'id',
        'title',
        'notes',
        'author',
        'maintainer',
        'created_at',
        'updated_at',
      ],
      include: [
        {
          model: models.Community, // dataset належить громаді
          attributes: ['id', 'name'],
          required: false,
        },
        {
          model: models.District, // dataset належить району
          attributes: ['id', 'name'],
          required: false,
        },
        {
          model: models.Tag,
          attributes: ['id', 'name'],
          through: { attributes: [] }, // Приховати таблицю зв'язку
          required: false,
        },
        {
          model: models.Group,
          attributes: ['id', 'name'],
          through: { attributes: [] },
          required: false,
        }
      ],
    });
    res.json(datasets);
  } catch (error) {
    console.error('❌ Помилка при отриманні наборів даних:', error);
    res.status(500).json({ error: 'Не вдалося отримати набори даних' });
  }
});

// API для одного набору даних по id (опціонально)
app.get('/api/dataset/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const dataset = await models.Dataset.findByPk(id, {
      include: [
        {
          model: models.Resource,
          attributes: ['id', 'name', 'format', 'url', 'size', 'created_at'],
        },
        {
          model: models.Tag,
          attributes: ['id', 'name'],
          through: { attributes: [] },
        },
        {
          model: models.Group,
          attributes: ['id', 'name'],
          through: { attributes: [] },
        }
      ],
    });

    if (!dataset) return res.status(404).json({ error: 'Dataset not found' });

    res.json(dataset);
  } catch (error) {
    console.error('❌ Помилка при отриманні набору даних:', error);
    res.status(500).json({ error: 'Помилка при отриманні набору даних' });
  }
});

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
