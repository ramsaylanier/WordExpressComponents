import React from 'react';
import { connect } from 'react-apollo';
import gql from 'graphql-tag';

class WordExpressPage extends React.Component{
	render(){
    const { getPage } = this.props;
    const { Layouts } = this.props.routes[0];
    let Layout;

    if (getPage.loading){
      return <div></div>
    } else{
      const { post:page } = getPage;

      if (!page){
        Layout = Layouts['NotFound'];
      } else if (page.layout){
        Layout = Layouts[page.layout.meta_value] || Layouts['Default'];
      } else {
        Layout = Layouts['Default'];
      }

      return <Layout.Component page={page} layout={Layout}/>
    }
	}
}

const WordExpressPageWithData = connect({
  mapQueriesToProps({ ownProps, state}){
    return {
      getPage: {
        query:gql`
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
        `,
        variables: {
          page: ownProps.params.page || 'Homepage'
        }
      }
    }
  }
})(WordExpressPage);

export default WordExpressPageWithData;
