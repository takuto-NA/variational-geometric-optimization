# variational-geometric-optimization

VitePress（Markdown）でドキュメントを管理し、GitHub Actions で GitHub Pages にデプロイします。

## ローカル開発

```bash
npm install
npm run docs:dev
```

## ビルド

```bash
npm run docs:build
```

## GitHub Pages デプロイ

- `main` ブランチへ push すると `.github/workflows/deploy.yml` が走ります
- GitHub 側の設定で **Settings → Pages → Build and deployment** を **GitHub Actions** にしてください

