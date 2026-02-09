# 🚀 个人作品集网站

一个现代化、响应式的个人作品集网站，使用 React、Tailwind CSS 和 Framer Motion 构建。

## ✨ 特性

- 🎨 现代化设计，带有渐变色和动画效果
- 📱 完全响应式布局
- ⚡ 使用 Framer Motion 的流畅动画
- 🎯 平滑滚动导航
- 💼 作品展示部分
- 📝 联系表单
- 🔢 数字统计动画

## 🛠️ 技术栈

- **React** - UI 框架
- **Tailwind CSS** - 样式框架
- **Framer Motion** - 动画库
- **React Icons** - 图标库
- **React Type Animation** - 打字动画效果
- **React CountUp** - 数字滚动动画
- **React Scroll** - 平滑滚动

## 📦 安装

1. 克隆仓库
```bash
git clone <your-repo-url>
cd portfolio-website
```

2. 安装依赖
```bash
npm install
```

3. 启动开发服务器
```bash
npm start
```

4. 在浏览器中打开 [http://localhost:3000](http://localhost:3000)

## 📁 项目结构

```
src/
├── assets/          # 图片和静态资源
├── components/      # React 组件
│   ├── About.js
│   ├── Banner.js
│   ├── Contact.js
│   ├── Header.js
│   ├── Nav.js
│   ├── Services.js
│   └── Work.js
├── App.js
├── index.css
├── index.js
└── variants.js      # Framer Motion 动画变体
```

## 🎨 自定义

### 修改个人信息

在 `Banner.js` 中更新你的名字和职业：
```javascript
<h1>你的名字</h1>
<TypeAnimation 
  sequence={[
    '你的职业1',
    2000,
    '你的职业2',
    2000,
  ]}
/>
```

### 修改服务内容

在 `Services.js` 中更新服务列表：
```javascript
const services = [
  {
    name: '服务名称',
    description: '服务描述',
    link: 'Learn more',
  },
  // 添加更多服务...
];
```

### 修改作品展示

在 `Work.js` 中替换作品图片和信息。

### 颜色主题

在 `tailwind.config.js` 中修改主题色：
```javascript
colors: {
  primary: '#0a0a0a',
  accent: '#B809C3',  // 修改强调色
},
```

## 📝 所需资源

确保在 `src/assets/` 文件夹中准备以下资源：
- `avatar.svg` - 你的头像
- `logo.svg` - 网站 Logo
- `site-bg.jpg` - 背景图片
- `about.png` - About 部分背景
- `services.png` - Services 部分背景
- `portfolio-img1.png` - 作品图片 1
- `portfolio-img2.png` - 作品图片 2
- `portfolio-img3.png` - 作品图片 3

## 🚀 部署

### 构建生产版本
```bash
npm run build
```

### 部署到 Vercel
1. 安装 Vercel CLI: `npm i -g vercel`
2. 运行: `vercel`

### 部署到 Netlify
1. 运行 `npm run build`
2. 将 `build` 文件夹拖到 Netlify

## 📄 License

MIT License - 随意使用和修改！

## 🤝 贡献

欢迎提交 Pull Requests！

---

用 ❤️ 和 React 制作
