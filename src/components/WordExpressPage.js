import {Component, PropTypes} from 'react'
import { gql, graphql } from 'react-apollo'

class WordExpressPage extends Component{
  render(){
    const {data} = this.props
    const {loading, post} = data
    const {Layouts} = this.props.routes[0]
    let Layout

    if (!loading) {
      if (!post) {
        Layout = Layouts['NotFound']
      } else if (post.layout) {
        Layout = Layouts[post.layout.meta_value] || Layouts['Default']
      } else {
        Layout = Layouts['Default']
      }

      return <Layout.Component page={post} layout={Layout}/>
    }

    return <div></div>
  }
}

WordExpressPage.propTypes = {
  data: PropTypes.object,
  routes: PropTypes.array
}

const PageQuery = gql`
  query getPage($page: String){
    post(name: $page){
      id,
      post_title
      post_content
      thumbnail,
      layout{
        meta_value
      }
    }
  }
`

const PageWithData = graphql(PageQuery, {
  options: ({params}) => ({
    variables: {
      page: params.page || 'homepage'
    }
  })
})(WordExpressPage)

export default PageWithData
