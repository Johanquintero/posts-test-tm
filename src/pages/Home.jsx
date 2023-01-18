import React from 'react'
import Navbar from '../layout/Navbar'
import apiCli from '../api/apiService'
import likeIcon from '../img/like.png'
import reloadIcon from '../img/reload.png'
import closeIcon from '../img/close.png'

export default function Home() {
  const [posts, setPosts] = React.useState([]);
  const [postsOld, setPostsOld] = React.useState([]);
  const [tags, setTags] = React.useState([]);
  const [modalOpen, setModalOpen] = React.useState(true)
  const [infoOwner, setInfoOwner] = React.useState({});
  const [loading, setLoading] = React.useState(false)

  const getPosts = async () => {
    try {
      setLoading(true);
      await apiCli.get(`/post`).then((result) => {
        const { data } = result;
        const { data: dataPost } = data;

        const tagsArray = [];

        if (dataPost.length > 0) {

          dataPost.forEach(post => {
            const { tags } = post;

            tags.forEach(item => {
              tagsArray.push(item);
            });
          })
          setPosts(dataPost);
          setPostsOld(dataPost);
        }

        const filterTags = tagsArray.filter((valor, indice) => {
          return tagsArray.indexOf(valor) === indice;
        });

        setTags(filterTags);
        setLoading(false);
      }).catch((err) => {
        throw new Error(err.data ?? err.message)
      });

    } catch (error) {
      setLoading(true);
      console.log(error.message)
    }
  }

  const onOptionChangeHandler = (event) => {
    setLoading(true);
    const filterTag = postsOld.filter(post => post.tags.includes(event.target.value))
    setPosts(filterTag)
    setLoading(false);
  }


  React.useEffect(() => {
    getPosts();
    // eslint-disable-next-line
  }, [])


  return (
    <>
      <div>
        <Navbar />
      </div>

      <div style={{ display: "flex", justifyContent: "center", zIndex: 2 }}>
        <div className='container' style={{ width: "100vh" }}>

          <div style={{ width: "100%" }}>
            <h1 style={{ textAlign: "center" }}>POSTS</h1>
          </div>

          <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
            <label style={{ marginRight: 10 }}>Filter Tags:</label>
            <select onChange={onOptionChangeHandler}>
              <option>Please choose one option</option>
              {tags.map((option, index) => {
                return <option key={`tagFilterSelec${index}`} >
                  {option}
                </option>
              })}
            </select>
            <img src={reloadIcon} alt="iconReload" width={20} style={{ margin: 10, cursor: "pointer" }} onClick={() => setPosts(postsOld)} />
          </div>

          {loading ? (
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
              <div className="spinner"></div>
            </div>
          ) : posts.length > 0 ? posts.map((post) =>
            <div key={`targetPost${post.id}`} className="card" style={{ margin: 10 }}>
              <div className="row" style={{ display: "inline-flex", width: "100%" }}>

                <div className='col-1' style={{ textAlign: "center", padding: 10, borderRight: "1px solid" }}>
                  <h6>USER POST</h6>
                  <img src={post.owner.picture} alt="userPost" width={100} height={100} style={{ cursor: "pointer" }} onClick={() => { setModalOpen(!modalOpen); setInfoOwner(post.owner) }} /><br />
                  <span>{`${post.owner.firstName} ${post.owner.lastName}`}</span>
                </div>

                <div className='col-2' style={{ textAlign: "center", padding: 10, borderRight: "1px solid" }}>
                  <h6>POST</h6>
                  <img src={post.image} alt="userPost" width={100} height={100} />
                  <h5>{post.text}</h5>
                </div>

                <div className='col-3' style={{ textAlign: "center", padding: 10 }}>
                  <h6>TAGS</h6>
                  <div style={{ display: "block" }}>
                    {post.tags.map((tag, index) =>
                      <div key={`tags${post.id}-${index}`}><span>-{tag}</span></div>
                    )}
                  </div>
                </div>
              </div>

              <div className="row" style={{ display: "inline-flex", width: "100%" }}>
                <span style={{ display: "flex", justifyContent: "center", alignItems: "center" }}><img src={likeIcon} alt="Likes" width={30} style={{ padding: 10 }} />{post.likes}</span>
              </div>

            </div>

          ) : (
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
              <h1>No Posts</h1>
            </div>
          )}
        </div>

      </div>

      {/* //dialog */}
      <div className='card-box' style={{ position: "fixed", display: modalOpen ? "none" : "flex", justifyContent: "center", width: "auto", zIndex: 1, top: "40vh", left:window.innerWidth <= 700 ? "10vh" : "80vh", backgroundColor: "#fff" }}>
        <div className='container' style={{ width: "100%" }} >
          <div style={{position:"absolute", width: "100%", display: "flex", justifyContent: "end", right:10 }}>
            <img alt='close' src={closeIcon} width={30} onClick={() => setModalOpen(!modalOpen)} style={{ padding: 5, cursor: "pointer" }} />
          </div>

          <div style={{ width: "100%", display: "flex",padding:15 }}>
            <div style={{ textAlign: "center" }}>
              <p>ID : {infoOwner.id}</p>
              <img src={infoOwner.picture} alt="userPost" width={100} height={100} /><br />
              <span style={{fontWeight:"bold",fontSize:"1.2em"}}>{`${infoOwner.title}.  ${infoOwner.firstName} ${infoOwner.lastName}`}</span>
            </div>
          </div>

        </div>
      </div>
    </>
  )
}