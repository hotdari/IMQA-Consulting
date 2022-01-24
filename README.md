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

// 14버전 강제로 변경
nvm alias default 14
```

## vue cli 설치
```shell
// 설치된 버전 확인
vue --version

// vue cli 설치
npm i -g @vue/cli
```

# Develop

```shell
 npm run electron:serve
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

# .eslintrc.js
```javascript
module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ["prettier", "plugin:vue/base"], // 추가
  plugins: ["prettier", "vue"], // 추가
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly"
  },
  parser: "vue-eslint-parser",
  parserOptions: {
    parser: "babel-eslint",
    sourceType: "module",
    ecmaVersion: 12
  },
  rules: {
    "arrow-parens": ["error", "as-needed"],
    "comma-spacing": ["error", { before: false, after: true }],
    eqeqeq: "error",
    indent: ["error", "tab", { SwitchCase: 1 }],
    "linebreak-style": ["error", "unix"],
    "key-spacing": ["error", { beforeColon: false, afterColon: true }],
    "no-console": "off",
    "no-case-declarations": "error",
    "no-var": "error",
    quotes: ["error", "double"],
    "quote-props": ["error", "as-needed", { numbers: false }],
    semi: ["error", "always"],
    "space-before-function-paren": [
      "error",
      { anonymous: "always", named: "never", asyncArrow: "always" }
    ],
    "space-in-parens": ["error"],
    "space-infix-ops": ["error"],
    "object-curly-spacing": [
      "error",
      "always",
      { arraysInObjects: true, objectsInObjects: true }
    ],
    "operator-linebreak": [
      "error",
      "after",
      { overrides: { "?": "after", ":": "after" } }
    ],
    // plugin:vue/recommended 로 인한 디폴트값 변경 rule
    "no-unused-vars": [
      "off",
      { vars: "all", args: "after-used", ignoreRestSiblings: false }
    ],
    "prefer-const": [
      "error",
      {
        destructuring: "any",
        ignoreReadBeforeAssign: false
      }
    ],
    "no-lonely-if": "error",
    "comma-dangle": ["error", "never"],
    "generator-star-spacing": "off",
    curly: ["error", "all"],
    "require-await": "error",
    "dot-notation": "error",
    "no-useless-rename": "error",
    // vue 확장자만 작동하는 lint
    "vue/no-parsing-error": [
      "error",
      {
        "x-invalid-end-tag": false
      }
    ],
    "vue/no-multiple-template-root": "off",
    "vue/require-default-prop": "off",
    "vue/attributes-order": "off",
    "vue/html-self-closing": "off",
    "vue/prop-name-casing": "off",
    "vue/require-prop-types": "off",
    "vue/require-prop-types": "off",
    "vue/order-in-components": [
      //컴포넌트 order 순서
      "error",
      {
        order: [
          "el",
          "name",
          "parent",
          "functional",
          ["delimiters", "comments"],
          ["components", "directives", "filters"],
          "extends",
          "mixins",
          "inheritAttrs",
          "model",
          ["props", "propsData"],
          "fetch",
          "asyncData",
          "data",
          "computed",
          "watch",
          "LIFECYCLE_HOOKS",
          "methods",
          "head",
          ["template", "render"],
          "renderError"
        ]
      }
    ]
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
};

```

# eslintignore
```javascript
.nyc_output/*
dist_electron/*
dist/*
build/*
node_modules/*
public/*
src/components/*
src/directives/*
src/plugins/*
src/util/*
```
