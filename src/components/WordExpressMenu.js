import React from 'react';
import { connect } from 'react-apollo';
import gql from 'graphql-tag';

class WordExpressMenu extends React.Component{

	render(){
    const { loading } = this.props.getMenu;

    if (loading){
      return(
        <div></div>
      )
    } else {

  		const { menus } = this.props.getMenu;
      const children = React.cloneElement(this.props.children, {menu: menus});

  		return (
        <div className="wordexpress-menu">{children}</div>
  		)
    }
	}
}


const WordExpressMenuWithData = connect({
  mapQueriesToProps({ ownProps, state}) {
    return {
      getMenu: {
        query: gql`
          query getMenu($menu: String){
            menus(name: $menu){
              items {
    						id,
    						order,
                post_title,
                object_type,
    		        navitem {
    		          id,
    		          post_title,
    		          post_name
    		        },
    		        children {
    		          id,
    		          linkedId,
    		          navitem {
    		            post_title,
    		            post_name
    		          }
    		        }
    		      }
            }
          }
        `,
        variables: {
          menu: ownProps.menu
        }
      }
    }
  }
})(WordExpressMenu);

export default WordExpressMenuWithData;
