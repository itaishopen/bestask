

function getBoardById(boardId){
    axios.get(`/api/board/${boardId}`)
    .then(res => res.data
    )
}


