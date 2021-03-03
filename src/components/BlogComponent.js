function BlogComponent(props) {
    return(
        <div>
            {
                props.post.map(p => {
                    <div>
                        { p.title }
                    </div>
                })
            }
        </div>
    )
}

export default BlogComponent;