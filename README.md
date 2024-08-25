## part 1-1 Next.js 많이 쓰는 이유를 알아보자
	1. client-side rendering
		- 브라우저에서 html을 실시간으로 만드는 방법
		- 이쁘고 부드러운 사이트는 만들 수 있는데 첫 페이지 로딩속도저하, 검색노출어려움 같은 단점이 있어
			웹사이트의 bounce rate 이런 지표들이 낮아지고 트래픽 잡으려고 광고비도 많이 들고 
			그래서 투자대비 수입 지표가 낮아질 수 밖에 없음
			
	2. server-side rendering
		- 서버에서 html을 미리 만들어 보냄
		- 서버에서 html을 미리 만들어주기 때문에 위의 단점들이 사라지는 경우가 많음
		- useState useEffect react-query redux ajax react-router props가 필요없음
		
		
## part 1-2 Next.js 설치와 개발환경 셋팅
	1. 개발환경 설치
		1) npx create-next-app@latest
		2) 선택지 알아서 하기
		3) npm run dev
		
	2. 폴더구조 설명
		- app 폴더 : 님들이 코드짤 폴더 
		- page.js : 메인페이지 
		- layout.js : 메인페이지 감싸는 용도의 페이지 
		- public 폴더 : 이미지나 static 파일 보관용 
		- api 폴더 : 서버기능 만드는 곳 
		- next.config.js : nextjs 설정 파일 
		- node_modules 폴더 : 설치한 라이브러리 보관용 폴더 
		- package.json : 설치한 라이브러리 버전 기록용 파일
		
		
		
## part 1-3 페이지 레이아웃 만들기 (React 기초문법)
	1. 리액트 강의 듣고오기

	
	
## part 1-4 여러 페이지 만들기 (라우팅)
	1. 라우팅
		1) app폴더에서 폴더 하나와 그 폴더의 js파일 하나 만들기
		2) 코드적기
		3) /폴더명 => 라우팅 끝
		4) Link도 next/link 이런거 임포트 해오면 끝
		
	2. layout.js
		- 모든 화면에서 쓰는 컴포넌트를 적는곳
		- children은 page.js에 적은것들임
		- 전체 layout으로 써도 되지만 각 폴더의 layout을 써서 활용도 가능
		- 양식은
			export default function Layout({ children }) {
				return (
				  <div>
					<p>현대카드 무이자이벤트중</p>
					{children}
				  </div>
				)
			  }
			
	3. page.js를 보여줄 때
		1) 옆에 layout.js가 있으면 그걸로 page.js를 감싼다
		2) 상위폴더에 layout.js가 있으면 그걸로 1번 싸맨다
		
		
## part 1-5 html을 반복문으로 줄이고 싶으면 map
	1. 리액트 강의듣기
	

## part 1-6 Next.js에서 이미지 넣는 법 2개
	1. lazy
		-이미지를 최적화해서 가져오는 문법
				1) import Image from "next/image";
				2) 이미지 태그를 Image를 사용
				2) 이미지 임포트 후 사용
				
	2. 외부 이미지를 가져오는 경우
		- width와 heigth를 설정해줘야한다
		- next.config.js파일에서 
			/** @type {import('next').NextConfig} */
				const nextConfig = {
					images: {
						remotePatterns: [
							{
								protocol : 'https',
								hostname: 's3.~~~',
								port: '',
								pathname: '/my-bucket/**'
							}
						]
					}
				};

				export default nextConfig;
			=> 이렇게 설정을해줘야한다


## part 1-7 client/server component, import 문법
	1. server component
		- html에 클릭 같은 이벤트를 넣어줄 수 없다
		- 그외 useEffect등도 사용 못함
		- 로딩속도 검섹엔진 빠름
		
	2. server component
		- 맨 위에 'use client' 하면 클라이언트 됨
		- 로딩속도 느림(자바스크립트 많이필요, hydration 필요)
		
	그래서 큰 페이지는 서버컴포넌트를 사용하고
	js가 필요한 곳만 클라이언트 컴포넌트를 사용
	
	
## part 1-8 Component에 데이터 전해주려면 props
	1. props
		리액트 문법
		
## part 1-9 좋아요 버튼 만들기 (useState, onClick)
	1. 리액트 문법
	
## part 1-10 좋아요 버튼 만들기 2 (array, object state 변경하려면)
	1. 
