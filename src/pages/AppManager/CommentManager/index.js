import React from 'react'
import Header from 'components/Header'
import './index.less'
import LeftMenu from './../LeftManager';
export default class CommentManager extends React.Component {
	state = {
		normalIndex: 2
	}
	/**跳转进去页面 */
	changeMunePath = (data, index) => {
		this.setState({
			normalIndex: index
		})
		this.props.history.push({ pathname: data.path })
	}
	componentDidMount() {
		// document.title = "我的工具"
	}
	render() {
		const { normalIndex } = this.state;
		return (
			<div className={'Appmaneger-wrap'}>
				<Header />
				<div className={'Appmaneger-box'}>
					<LeftMenu
						normalIndex={normalIndex}
						changeMunePath={this.changeMunePath}
					/>
					<div className={'mytoolcontent'}>
						{/* 右侧应用列表详情 */}
						<div className={'right'}>
							<div className={'rightContent'}>
								评论管理
						</div>
						</div>
					</div>
				</div>

			</div>
		);
	}
}
