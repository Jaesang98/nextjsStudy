## part 2-1 새로운 프로젝트 생성 / MongoDB 셋팅
	1. 관계형 데이터 
		- sql oracle같이 표형식으로 데이터를 저장
		
	2. 비 관계형 데이터
		- mongodb처럼 오브젝트처럼 저장
		
		
## part 2-2 Next.js에서 MongoDB 사용하기
	1. 데이터 넣어보기
		1) 몽고db 사이트 들어가기
		2) 오버뷰의 collections들어가기
		3) create Database 클릭 후 네임 컬럼 확인
		4) 데이터넣기
		
	2. 몽고디비 데이터 가져오기
		1) npm install mongodb
		2) 양식에 맞춰 쓰기
			  const client = await MongoClient.connect('DB접속URL~~', { useNewUrlParser: true })
			  const db = client.db("forum")
			  db.collection('post').find
			  
		3) 몽고디비 사이트 메인에서 connect의 Connect to your application 클릭
		4) url 복사 후 db접속 url에 삽입
		5) admin:<db_password> 이거 내가 설정한거로 바꾸기
		
		
	3. 디비 폴더를 통한 구조
		1) import { MongoClient } from 'mongodb'
			const url = 'DB접속URL~~'
			const options = { useNewUrlParser: true }
			let connectDB

			if (process.env.NODE_ENV === 'development') {
			  if (!global._mongo) {
				global._mongo = new MongoClient(url, options).connect()
			  }
			  connectDB = global._mongo
			} else {
			  connectDB = new MongoClient(url, options).connect()
			}
			export { connectDB }
			- import 어쩌구를 해야 설치한 라이브러리 사용이 가능합니다. 

			- connectDB 변수를 하나 만들어서 MongoClient.connect 결과를 저장해두고 export 해서 필요할 때마다 사용하면 됩니다.

			- 근데 Nextjs의 경우 개발할 땐 파일저장할 때 마다 자바스크립트 파일들이 재실행되기 때문에
			MongoClient.connect가 동시에 여러개 실행될 수 있습니다. 그럼 DB입출력이 매우 느려짐 
			그걸 방지하고 싶으면 if문으로 "개발중 상태면 global이라는 전역변수 저장소에 보관해주세요" 라고 써놓으면 됩니다.

			- 개발말고 실제 프로덕션 상태일 땐 global을 사용안하는게 좋아서 else문도 추가했습니다.
			프로덕션 상태일 땐 중복실행될 일이 별로 없어서 대충 저렇게 해도 잘 돌아갑니다.
			이제 await connectDB 사용할 때 마다 그 자리에 MongoClient(url, options).connect()가 남으니까 맘대로 사용하면 됩니다.
			
		2) 컴포넌트에서 쓰기
			const client = await connectDB;
			const db = client.db("forum");
			let result = await db.collection('post').find().toArray
			
			
## part 2-3 글목록 조회기능 만들기 (DB 데이터 출력)
	1. 그냥 받아온거 맵 써서 반복


## part 2-4 상세페이지 만들기 1 (Dynamic route)
    1. Dynamic 사용법
        detail/1~1000 이렇게 만드려면
        detail 폴더 안에 [아무거나] 이 폴더를 만든 후 그 폴더에 page.js를 만들면됨

    2. 상세 페이지 만들기
        1) props를 통해 url파라미터를 가져온다
        2) import { ObjectId } from "mongodb"; 임포트 후 
            let result = await db.collection('post').findOne({_id: new ObjectId(props.params.폴더명)})
            => 이런식으로 findOne으로 하나만 가져오면서 아이디 값에따른 결과값을 가져온다

    3. 서버 사이드시에는 자바스크립트 코드가 안되기 때문에 경로이동은 Link로한다

## part 2-5 상세페이지 만들기 2 (useRouter)
    1. 클라이언트 코드를 쓰고 싶을 때
        1) import { useRouter } from "next/navigation" 임포트
        2) let router = useRouter(); 선언
        3) router.push('/list') 끝

    2. router 기능
        back forward refresh prefetch

    3. prefetch
         - 내용을 미리 로드하여 그 페이지 방문할 때 매우 빠르게 방문할 수 있음
         - server component에서는 Link가 저런기능
         - prefetch={false}를 사용하면 미리 로드안함 (너무 많으면 부담스럽기 때문)


## part 2-6 글 작성기능 만들기 1 (서버기능 개발은)
	1. 저장기능
		1) 글 작성페이지를 만듬
		2) 서버에 글 저장해달라고 요청
		3) 서버는 부탁받으면 검사하고 DB에 넣음

	2. 서버 만들기
		방법 1
			1) app 안에 api폴더를 만든다
				=> 이거는 신 문법이긴 한데 에러걸리는게 많음

		방버 2
			1) 따로 pages폴더를 만들고 그 안에 api폴더를 만든다
			2) pages/api/test.js 이런식으로 폴더안에 만든 파일과 폴더는 자동으로 서버기능의 URL이됨
			그래서 api/test로 post get put등을 요청하면 test.js파일이 실행이된다
			3) test.js의 형식은
				export default function handler(요청, 응답) {
					console.log(123);
					return 응답.status(200).json('안녕')
				}
				=> 이렇게 해주면 됨
			*200은 성공 500은 실패로 자주쓴다, 유저잘못은 400*


	3. POST GET
		<form action="/api/test" method="POST">
			<button type="submit">버튼</button>
		</form>

		=> 이런식으로 하면 POST, GET요청이 가능하다


## part 2-7 글 작성기능 만들기 2
	1. post 보내는법
		1) 인풋이든 어디든 name을 꼭 적어준다
		2) 2-6의 3번처럼 형태를 만들어 submit한다
		3) 받는 페이지에서는 요청.body치면 값이 나온다

		ex) 
		export default async function Write() {
			return (
			<div className="p-20">
				<form action="/api/post/new" method="POST">
				<input name="title" placeholder="글제목"/>
				<input name="content" placeholder="글내용"/>
				<button type="submit">전송</button>
				</form>
			</div>
			)
		} 
		=> 이렇게 요청

		export default function handler(요청, 응답) {
			console.log(요청.body)
		}
		=> 이렇게 받음

		4) 받아서 db에 넣는법
			import { connectDB } from "@/util/database";
			export default async function handler(요청, 응답) {
				if (요청.method == "POST") {
					const client = await connectDB;
					const db = client.db("forum");
					let result = await db.collection('post').insertOne(요청.body);
					return 응답.status(200).json('저장완료')
				}
			}
			=> insertOne으로 ㄱㄱ

			* return 응답.status(200).redirect(302,'/list'); *
			이런식으로 콜백을 redirect로 해도됨 

		5) 조건식
			제대로 된 값이 오는지 안오는지를 확인해야 할 경우에는
			1) 요청.body값을 확인하여 걸러준다
			2) 서버가 이상할 수 있으니 try catch문을 사용하자


## part 2-8 수정기능 만들기 1
	1. 몽고디비에서 ID가져오기
		import { ObjectId } from "mongodb";
		let result = await db.collection('post').findOne({_id : new ObjectId(props.params.id)})

## part 2-9 수정기능 만들기 2
	업데이트는
		await db.collection('post').updateOne(
            {_id: new ObjectId(요청.body._id) },
            { $set: 바꿀거  }
        );
	=> 이런식으로 바꿀 것의 고유값과 바뀌는것을 덮어써버릴 값을 $set에 넣어줘야한다

	만약 덮어쓰는게 아닌 +1 등으로 값을 가볍게 올리는거면 $inc를 사용하면 된다


## part 2-10 삭제기능 만들기 1 (Ajax)
	1. 자식이 데이터를 받는 방법
		1) 부모가 props로 전달
		2) 그냥 서버에 요청해서 데이터를 가져옴 
			=> 구조가 복잡해지면 이게 편함

	2. 서버요청
		1) form은 서버컴포넌트에서 서버요청을 위한것

		2) client에서는 ajax를 사용
			- 1 GET
				<span onClick={() => {
					fetch('/api/test').then(()=> {
						console.log("A")
					})
				}}>삭제</span>
			
			- 2 POST PUT DELETE
				fetch('/api/test', {
					method: 'POST' or 'PUT' or 'DELETE',
					body : JSON.stringify(데이터)
				})


## part 2-11 삭제기능 만들기 2 (Ajax 추가내용과 에러처리)
	1. 클라이언트 컴포넌트에서 서버 컴포넌트에 body값 보낼때
		문자는 그냥 보내도 되지만 json일 경우 json.stringfy 이렇게 보내야함
		그 후 서버에서 받을 떄는 JSON.parse(요청.body) 이렇게 받아야 json처럼 사용가능

	2. 가끔 Delete가 안먹을떄는 post도 ㄱㅊ

	3. 서버에서 쓴 status값 같은거 확인할 때
		fetch('/api/post/delete', {
			method: 'DELETE',
			body: item._id
		}).then((r) => {
			if (r.status == 200) {
				return r.json()
			} else {
				//서버가 에러코드전송시 실행할코드
			}
		}).then((result) => {
			//성공시 실행할코드
		}).catch((error) => {
			//인터넷문제 등으로 실패시 실행할코드
			console.log(error)
		})
		=> 이 형식 외우기


## part 2-12 삭제기능 만들기 3 (query string / URL parameter)
	1. query string 
		서버에 url에 파라미터까지 전부 담아서 보낼 경우
		/api/test?a=10 이딴식으로 했을 떄
		요청.query로 객체형식으로 받을 수 있음

	2. URL parameter
		api폴더에 [이름].js 이렇게 폴더를 만들면
		그 서버에서는 요청.query이렇게 받을 수 있음
		클라이이언트에서는 그냥 /폴더/내가 보낼데이터 이렇게하면 됨