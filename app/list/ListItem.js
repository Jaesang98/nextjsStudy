'use client'
import Link from "next/link"

export default function ListItem({ result }) {
    return (
        <>
            {
                result.map((item, idx) =>
                    <div className="list-bg list-item" key={idx}>
                        <div className="list-item">
                            <h4>{item.title}</h4>
                            <Link href={`/detail/${item._id}`}>링크</Link>
                            <Link href={`/edit/${item._id}`}>수정하기</Link>
                            {/* <DetailLink></DetailLink> */}
                            <p>1월 1일</p>
                            <button onClick={() => {
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
                                    e.target.parentElement.style.opacity = 0;
                                    setTimeout(() => {
                                        e.target.parentElement.style.display = 'none';
                                    }, 1000)
                                }).catch((error) => {
                                    //인터넷문제 등으로 실패시 실행할코드
                                    console.log(error)
                                })
                            }}>삭제</button>
                        </div>
                    </div>
                )
            }
        </>
    )
}