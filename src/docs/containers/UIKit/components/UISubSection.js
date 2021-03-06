import React, { Component } from 'react';

export class UISubSection extends Component {

	render() {
		return (
			<div className={"my-3 space-after ui-sub-section " + this.props.className} id={this.props.id}>
				<hr className="my-2"/>
				<div className="grid-flex wide-space-after baseline">
					<div className="col-4">
						<h4>{this.props.title}</h4>
					</div>
					<div className="col-8">
						<div className={this.props.children && this.props.description ? "rich-text space-after" : "rich-text"}>
							{this.props.description}
						</div>
						{this.props.children}
					</div>
				</div>
			</div>
		);
	}

}

export default UISubSection;