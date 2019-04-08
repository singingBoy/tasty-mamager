import React, { PureComponent, Fragment } from 'react'
import PropTypes from 'prop-types'
import { Button, Row, Form, Icon, Input } from 'antd'

import './login.less'
const FormItem = Form.Item;

class Login extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
        }
    }
    handleOk = () => {
        const { form } = this.props;
        const { validateFieldsAndScroll } = form
        validateFieldsAndScroll((errors, values) => {
            if (errors) {
                return
            }
            console.log('请求登录');
        })
    };

    render() {
        const { form } = this.props;
        const { getFieldDecorator } = form;

        return (
            <Fragment>
                <div className='login_bg'>
                    <div className='form'>
                        <div className='logo'>
                            <img alt="logo" src='/logo.svg' />
                            <span>小鲜味管理系统</span>
                        </div>
                        <form>
                            <FormItem hasFeedback>
                                {getFieldDecorator('username', {
                                    rules: [
                                        {
                                            required: true,
                                        },
                                    ],
                                })(
                                    <Input
                                        onPressEnter={this.handleOk}
                                        placeholder="帐号"
                                    />
                                )}
                            </FormItem>
                            <FormItem hasFeedback>
                                {getFieldDecorator('password', {
                                    rules: [
                                        {
                                            required: true,
                                        },
                                    ],
                                })(
                                    <Input
                                        type="password"
                                        onPressEnter={this.handleOk}
                                        placeholder="密码"
                                    />
                                )}
                            </FormItem>
                            <Row>
                                <Button
                                    type="primary"
                                    onClick={this.handleOk}
                                    loading={this.state.loading}
                                >
                                    <span>Sign in</span>
                                </Button>
                                <p>
                                    <span>致力于农产品到家服务，让食品健康绿色</span>
                                </p>
                            </Row>
                        </form>
                    </div>
                </div>
            </Fragment>
        )
    }
}

Login.propTypes = {
    form: PropTypes.object,
    dispatch: PropTypes.func,
    loading: PropTypes.object,
};

export default Form.create()(Login);
