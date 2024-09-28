# 상식로그 웹

상식로그 플랫폼(https://sangsiklog.sotre) 의 프론트엔드 웹 애플리케이션입니다.\
Vue.js와 TypeScript를 사용하여 개발되었습니다.

## 주요 기능
- 유저 인터페이스: 직관적인 사용자 경험 제공.
- 반응형 디자인: 다양한 디바이스에서 최적화된 화면 제공.
- API 통합: 백엔드 API와의 통신을 통한 데이터 처리.

## 설치 및 실행

### 요구 사항
- Node 20 이상
- Docker

### 로컬에서 실행

```bash
# 코드 복사
git clone https://github.com/SangsikLog/sangsiklog-web.git
cd sangsiklog-web
```

### 환경세팅
```bash
# yarn이 없으면 
npm install -g yarn 
```

### 의존성 설치
```bash
yarn install
```

### 개발환경 실행
```bash
yarn dev
```

### 프로덕션 빌드
```bash
yarn build-real
```

### Lint
```bash
yarn lint
```

### 환경 설정
필요하다면 .env 에서 설정을 조정하세요:

```
VITE_API_GW_URL = {gateway-url}
```

## 기여
기여를 환영합니다! 풀 리퀘스트 또는 이슈를 제출해주세요.

## 라이선스
MIT License.
