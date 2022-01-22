# IMQA-Consulting

IMQA 제품을 컨설팅하는데 도움을 드립니다.

# Version

- node : v14.18.3 (nvm 사용)
- vue : @vue/cli 4.5.15

# Setting

## nvm node version install
```shell
// 설치된 버전들 확인
nvm list

// 14 버전 설치
nvm install 14

// 14버전 사용 및 기본 버전변경
nvm use default 14
```

## vue cli 설치
```shell
// 설치된 버전 확인
vue --version

// vue cli 설치
npm i -g @vue/cli
```

# Deploy

```shell
dist_eletron 폴더에 파일이 생성됩니다.
```

## Window

```shell
// window 배포
npm run electron:build-win

// window 32, 64비트 배포
npm run electron:build-win32
npm run electron:build-win64
```

## Mac

```shell
// mac 배포
npm run electron:build-mac
```
