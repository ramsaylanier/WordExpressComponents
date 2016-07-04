# WordExpress Components
This package contains useful components for [WordExpress](http://wordexpress.io). The components contain GraphQL queries that return data from a WordPress database, using [ApolloStack](http://apollostack.com) to fetch the data.

For a full example of how these components work, check out the repo for [WordExpress.io](https://github.com/ramsaylanier/WordpressExpress), which was built using some of these components.



## Components

[WordExpressPage](#wordexpresspage)

[WordExpressMenu](#wordexpressmenu)


### WordExpressPage

This is a component used to render a WordPress page. It's probably mostly used as a the component to render on a React Router route. In WordExpress, this is how it's being used:

```es6
...
import Layouts from './components/layouts/layouts.js';
import { WordExpressPage } from 'wordexpress-components';

let routes = (
  <Route path="/" component={App} Layouts={Layouts}>
    <IndexRoute component={WordExpressPage}/>
    <Route path=":page" component={WordExpressPage}/>
  </Route>
);
...
```

Above, the Layouts component is a mapped object that return a Layout Component based on a custom field in your WordPress backend. The details of how Layouts work is [explained here](https://github.com/ramsaylanier/WordPressExpress#using-react-components-as-layouts). WordExpressPage contains a query which fetchs the Page based on its slug and gets the layout value. It also gets things like Post Title and Post Content as well. Refer the the [source](https://github.com/ramsaylanier/WordExpressComponents/blob/master/src/components/WordExpressPage.js) for more details.

WordExpressPage passes the returned Page data to it's Layout. It can be accessed like this:

```es6
class DefaultLayout extends React.Component{

  render(){
    const { loading } = this.props.page;

    if (loading){
      return (
        <div>loading...</div>
      )
    } else {

      const { post_title, post_content, thumbnail } = this.props.page;

      let bg = {
        backgroundImage: "url('" + thumbnail + "')"
      }

      return(
          <div style={bg}>
    				<div className="wrapper">
              <h2 className="title">{post_title}</h2>
    				</div>
    			</div>

    			<div className="content">
    				<div className="wrapper tight">
    					<PostContent post_content={post_content}/>
    				</div>
    			</div>
        </Page>
      )
    }
  }
}
```



### WordExpressMenu

This components fetchs a menu based on its slug and returns all of its items and links. Its used in WordExpress like this:

```es6
...
import { WordExpressMenu } from 'wordexpress-components';
...


class Header extends React.Component{

	render(){
		return (
			<header styleName="base">
				<div styleName="wrapper">
          <WordExpressMenu menu="primary-navigation">
  					<AppNav/>
          </WordExpressMenu>
				</div>
			</header>
		)
	}
}
```

Note that WordExpressMenu takes a prop called menu. This should be the slug of your WordPress menu. In the above example, AppNav has access to the Menu items.

```es6
...
import _ from 'lodash';
...

class AppNav extends  React.Component{

	render(){
		let { items } = this.props.menu;
		items = _.sortBy(items, 'order');

		return(
			<NavList type="primary">
				{items.map( item => {
					const { children } = item;
					return(
						<NavItem key={item.id}>
							<Link to={{ pathname: `/${item.navitem.post_name}` }} className={styles.link}>{item.navitem.post_title}</Link>
							{children.length > 0 &&
								<NavList type="subnav">
									{children.map( child => {
										return(
											<NavItem type="link" href="{child.navitem.post_name}">{child.navitem.post_title}</NavItem>
										)
									})}
								</NavList>
							}
						</NavItem>
					)
				})}
			</NavList>
		)
	}
}
```
In the above example, this will work for subnav items in your menu as well!
