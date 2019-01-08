import React, {Component} from "react";
import {connect} from "react-redux";
import {Button, Modal, ModalBody, ModalFooter, ModalHeader, Table, Card, CardBody} from "reactstrap";
import {goBack, push} from "react-router-redux";
import {download, load, remove} from "../../recucers/plugins";
import {getActiveLanguage, getTranslate} from "react-localize-redux";
import _ from "lodash";

class PluginDetailModal extends Component {

    static propTypes = {}

    state = {modal: false, title: "", details: ""}

    toggle() {
        this.setState({
            modal: !this.state.modal
        });
    }

    show(title, details, link, author) {
        this.setState({title, details, link, author})
        this.toggle()
    }

    cancel(e) {

        this.toggle()
    }

    confirm(e) {

        this.toggle()
    }

    render() {
        let {title, details, link, author} = this.state
        return (
            <Modal isOpen={this.state.modal} toggle={this.toggle.bind(this)}>
                <ModalHeader toggle={this.toggle.bind(this)}>{title}</ModalHeader>
                <ModalBody>
                    <p>
                        Author {author}
                    </p>
                    <p>
                        {details}
                    </p>
                    <p>
                        <a href={link}>Visit Website</a>
                    </p>
                </ModalBody>
                <ModalFooter>
                    <Button color="secondary" onClick={this.cancel.bind(this)}>Cancel</Button>
                    <Button color="secondary" onClick={this.confirm.bind(this)}>Confirm</Button>
                </ModalFooter>
            </Modal>
        )
    }
}

@connect((state, ownProps) => {
    return {
        translate: getTranslate(state.locale),
        currentLanguage: getActiveLanguage(state.locale).code,
        data: state.plugins.list,
        loading: state.plugins.loading

    }
}, (dispatch, ownProps) => {
    return {
        load: () => {
            dispatch(load())
        },
        download: (name) => {
            dispatch(download(name))
        },
        remove: (name) => {
            dispatch(remove(name))
        }

    }
}, null, {withRef: true})
export default class Plugins extends Component {

    componentDidMount() {
        this.props.load()
    }

    render_button(data, name) {
        if (data.loading === true) {
            return (<i className="fa fa-spinner fa-spin"/> )
        }
        if (data.installed === true) {
            return (<Button color="danger" onClick={() => {
                this.props.remove(name)
            }}>Delete</Button>)
        }
        else {
            return (<Button onClick={() => {
                this.props.download(name)
            }}>Donwload</Button>)
        }
    }

    render_table() {
        return [<Table >
            <thead>
            <tr>
                <td>Name</td>
                <td>Info</td>
                <td>API Version</td>
                <td>Author</td>
            </tr>
            </thead>
            <tbody>
            {_.map(this.props.data, (value, key) => <tr className={value.installed ? "table-success" : null}>
                <td>{key}</td>
                <td><Button onClick={() => {
                    this.refs.details.show(key, value.description, value.repo_url, value.author)
                }}><i className="fa fa-info"/> </Button></td>
                <td>{value.api}</td>
                <td>{value.author}</td>
                <td>
                    {this.render_button(value, key)}
                </td>
            </tr>)}
            </tbody>
        </Table>,
            <PluginDetailModal ref="details"/>]
    }

    render() {
        return (
            <div>
                <h1>Plugins</h1>
                <Card>
                    <CardBody>
                        <h3>Total Plugins: {_.size(this.props.data)}</h3>
                        If you like to publish your plugin to the official CraftBeerPI plugin repository write an email to info@craftbeerpi.com
                        <p>
                            Required Information: Author, Email, Plugin Name, GitHub URL, Documentation URL
                        </p>
                    </CardBody>
                </Card>
                {this.props.loading ? (<i className="fa fa-spinner fa-spin"/> ) : this.render_table()}


            </div>
        )
    }
}