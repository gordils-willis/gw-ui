import React, { Component } from 'react';
import InlineSVG from 'svg-inline-react';

import './Collapse';

export class Collapse extends Component {

	static defaultProps = {
		open : false,
		closeable : true,
		onOpen: () => {},
		onClose: () => {}
	};

	state = {
		open : this.props.open
	}

	open = (event) => {
		if(this.props.onOpen && this.props.id) {
			this.props.onOpen(event);
		} else {
			this.setState({open : true});
		}
	}

	close = (event) => {
		if (this.props.closeable) {
			if(this.props.onClose && this.props.id) {
				this.props.onClose(event);
			} else {
				this.setState({open : false});
			}
		}
	}

	toggle = (event) => {
		let open = this.state.open;
		if(open) {
			this.close(event);
		} else {
			this.open(event);
		}
	}

	componentWillReceiveProps (nextProps) {
		if (this.state.open && !nextProps.open) {
			this.setState({open : false});
		}
		if (!this.state.open && nextProps.open) {
			this.setState({open : true});
		}

	}

  icon () {
    var icon = '';
    if (this.props.icon) {
      if (this.props.icon.startsWith("<")) {
        icon = (<InlineSVG src={this.props.icon} element="span" className="icon" />);
      } else {
        icon = (<i className="material-icons icon">{this.props.icon}</i>);
      }
    }
    return icon;
  }

	iconOpen () {
		var icon = '';
		if (this.props.iconOpen && typeof this.props.iconOpen === 'string') {
			icon = (<i className="material-icons icon">{this.props.iconOpen}</i>);
		}
		if (this.props.iconOpen && typeof this.props.iconOpen !== 'string') {
			icon = (<InlineSVG src={this.props.iconOpen} element="span" className="icon" />);
		}
		return icon;
	}

	render() {

		const className = this.props.className || '';

		return (
			<div className={this.state.open ? ("collapse open " + className) : ("collapse " + className)}>
				<div onClick={this.toggle} className="collapse-header">
					<div className="flex-grid no-break tight-gutter">
						{this.props.iconOpen ? (this.state.open ? (this.iconOpen()) : (this.icon())) : (this.icon())}
						<div className="col grow">
							<div className={this.props.ellipsis != false ? ("title ellipsis") : ("title")}>{this.props.title}</div>
						</div>
						{this.props.hasArrow != false ? (
							this.state.open ? (<div className="col no-grow"><i className="material-icons icon right upside-down">keyboard_arrow_down</i></div>) : (<div className="col no-grow"><i className="material-icons icon right">keyboard_arrow_down</i></div>)
						) : false}
					</div>
				</div>
				{/*<CSSTransitionGroup
          transitionName="collapse-transition"
          transitionAppear={true}
		      transitionAppearTimeout={500}
          transitionEnterTimeout={500}
          transitionLeaveTimeout={500}
        >*/}
				{this.state.open ? (
					<div key="collapse-content" className="collapse-content">
						{this.props.children}
					</div>
				): false}
				{/*</CSSTransitionGroup>*/}
			</div>
		);
	}
}

export default Collapse;