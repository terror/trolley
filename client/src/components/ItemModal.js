import React, { Component } from 'react';
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    Form,
    FormGroup,
    Label,
    Input,
} from 'reactstrap';
import { connect } from 'react-redux';
import { addItem } from '../actions/itemActions';

class ItemModal extends Component {
    state = {
        modal: false,
        name: '',
        desc: 'None specified',
        cost: 0,
    };

    toggle = () => {
        this.setState({
            modal: !this.state.modal,
        });
    };

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };

    onSubmit = (e) => {
        e.preventDefault();
        const newItem = {
            name: this.state.name,
            desc: this.state.desc,
            cost: this.state.cost,
        };
        // Add item via addItem Action
        this.props.addItem(newItem);

        // Close modal
        this.toggle();
    };

    render() {
        return (
            <div>
                <Button
                    color="dark"
                    style={{ marginBottom: '2rem' }}
                    onClick={this.toggle}
                >
                    Add Item
                    <Modal isOpen={this.state.modal} toggle={this.toggle}>
                        <ModalHeader toggle={this.toggle}>
                            Add To Shopping List
                            <ModalBody>
                                <Form onSubmit={this.onSubmit}>
                                    <FormGroup>
                                        <Label for="item">Item</Label>
                                        <Input
                                            type="text"
                                            name="name"
                                            id="item"
                                            placeholder="Name"
                                            onChange={this.onChange}
                                        />
                                        <Input
                                            type="textarea"
                                            name="desc"
                                            id="item"
                                            style={{ marginTop: '1rem' }}
                                            placeholder="Description (optional)"
                                            onChange={this.onChange}
                                        />
                                        <Input
                                            type="Number"
                                            name="cost"
                                            id="item"
                                            style={{ marginTop: '1rem' }}
                                            placeholder="$ (optional)"
                                            onChange={this.onChange}
                                        />
                                        <Button
                                            color="dark"
                                            style={{ marginTop: '2rem' }}
                                            block
                                        >
                                            Add Item
                                        </Button>
                                    </FormGroup>
                                </Form>
                            </ModalBody>
                        </ModalHeader>
                    </Modal>
                </Button>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    item: state.item,
});

export default connect(mapStateToProps, { addItem })(ItemModal);
