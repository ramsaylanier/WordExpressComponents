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

Above, the Layouts component is a mapped object that return a Layout Component based on a custom field in your WordPress backend. The details of how Layouts work is [explained here](https://github.com/ramsaylanier/WordPressExpress#using-react-components-as-layouts). WordExpressPage contains a query which fetchs the Page based on its slug and gets the layout value. It also gets things like Post Title and Post Content as well. Refer to the [source](https://github.com/ramsaylanier/WordExpressComponents/blob/master/src/components/WordExpressPage.js) for more details.

WordExpressPage passes the returned Page data to it's Layout. It can be accessed like this:

```es6
class DefaultLayout extends Component {

  static propTypes = {
    page: PropTypes.object
  }

  render() {
    const { loading } = this.props.page;

    if (!loading) {
      const { post_title: title, post_content: content, thumbnail } = this.props.page;
      const bg = {backgroundImage: `url("${thumbnail}")`};
      const heroClass = thumbnail ? 'hero_thumbnail' : 'hero';

      return (
        <Page>
          <div styleName={heroClass} style={bg}>
    				<div styleName="wrapper tight">
              <h2 styleName="title">{title}</h2>
    				</div>
    			</div>

    			<div styleName="content">
    				<div styleName="wrapper tight">
    					<PostContent content={content}/>
    				</div>
    			</div>
        </Page>
      );
    }

    return <div></div>;
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
import {sortBy} from 'lodash';
...

class AppNav extends Component {

  static propTypes = {
    menu: PropTypes.object
  }

  render() {
    if (!this.props.menu) {
      return null;
    }

    let { items } = this.props.menu;
    items = sortBy(items, 'order');

    return (
      <NavList type="primary">
        <NavItem>
          <Link to="/"><Logo/></Link>
        </NavItem>
        {items.map( item => {
          const {children, object_type: type, post_title: title} = item;
          const linkText = title.length > 0 ? title : item.navitem.post_title;
          const pathname = type === 'page' ? `/${item.navitem.post_name}` : `/${type}/${item.navitem.post_name}`;

          return (
            <NavItem key={item.id}>
              <Link to={{ pathname: pathname }} className={styles.link}>{linkText}</Link>
              {children.length > 0 &&
                <NavList type="subnav">
                  {children.map( child => {
                    return (
                      <NavItem type="link" href="{child.navitem.post_name}">{child.navitem.post_title}</NavItem>
                    );
                  })}
                </NavList>
              }
            </NavItem>
          );
        })}
      </NavList>
    );
  }
}
```
In the above example, this will work for subnav items in your menu as well!
