import React, {Component, PropTypes} from 'react'
import { gql, graphql } from 'react-apollo'

class WordExpressMenu extends Component {

  render() {
    const {data} = this.props
    const {loading, menus} = data

    if (!loading) {
      const children = React.cloneElement(this.props.children, {menu: menus})

      return (
        <div className="wordexpress-menu">{children}</div>
      )
    }

    return (
      <div></div>
    )
  }
}

WordExpressMenu.propTypes = {
  data: PropTypes.object,
  children: PropTypes.node
}

const MenuQuery = gql`
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
  }`

const MenuWithData = graphql(MenuQuery, {
  options: ({menu}) => {
    return {
      variables: {
        menu: menu
      }
    }
  }
})(WordExpressMenu)

export default MenuWithData
