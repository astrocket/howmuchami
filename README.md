# How much am I?
- 회사 다니면서 실제로 버는 시급이 얼마인지도 궁금했고.
- 종종 파트타임으로 프로젝트 받아서 일할 때 단가를 산정하는게 귀찮아서 간단한 계산기를 만들었습니다.
- 세금 계산 로직은 하단의 자료를 토대로 만들었으며, 1인 가구 기준 입니다.

## Run
사전 설치 : ruby, postgres, node.js
```bash
git clone git@github.com:astrocket/howmuchami.git
cd howmuchami
bundle install
rails hot
```

## Coding
https://github.com/astrocket/rails-template 이거 기반으로 프로젝트를 init 했고
대략 아래의 것들이 적용되어 있습니다.
- 백엔드 : Ruby on Rails / Puma / Nginx
- 데이터베이스 : PostgreSQL
- 프론트엔드 : React (Hooks) + Next.js
- 스타일 : Tailwind.css / SCSS
- 인프라 : Digital Ocean / Docker / DockerCompose
- 도메인 : Go Daddy
- 테마 : https://www.tailwindtoolbox.com

## Ref
국세청 근로소득 간이 세액표 : https://www.nts.go.kr/support/support_03_etc01.asp
Jobis 4대 보험 블로그 글 : https://bit.ly/3aFgWW6
디자인 템플릿 : https://www.tailwindtoolbox.com/templates/app-landing-page
폼 UI : https://tailwindcss-custom-forms.netlify.com