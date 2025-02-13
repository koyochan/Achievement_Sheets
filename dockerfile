FROM node:18

# Firebase CLI をグローバルインストール
RUN npm install -g firebase-tools

# Java（OpenJDK）をインストール
RUN apt-get update && apt-get install -y openjdk-17-jre

# 作業ディレクトリを設定
WORKDIR /app

# package.json をコピーして依存関係をインストール
COPY package.json package-lock.json ./
RUN npm install

# サービスアカウントキーを `/app` にコピー
COPY 10Xer-service-account-file.json /app/10Xer-service-account-file.json
COPY firebase.json /app/firebase.json

# プロジェクトの全ファイルをコピー
COPY . .

# Firebase の webframeworks を有効化
RUN firebase experiments:enable webframeworks

# Firebase Emulator を実行
CMD ["npm", "run", "start:emulator"]