import React, {Component} from "react";
import {connect} from "react-redux";
import {Button, Card, CardBody, CardHeader, Table} from "reactstrap";
import {goBack, push} from "react-router-redux";
import {load} from "../../recucers/plugins";
import {getActiveLanguage, getTranslate} from "react-localize-redux";

import {Line} from "react-chartjs-2";

const getRandomInt = (max) => {
    return Math.floor(Math.random() * Math.floor(max));
}

const data = {
        datasets: [
            {
                label: 'My First dataset',

                borderColor: 'red',
                data: [{
                    x: 10,
                    y: 20
                }, {
                    x: 15,
                    y: 10
                },
                    {
                        x: 20,
                        y: 200
                    }]
            }
        ]
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
        }

    }
}, null, {withRef: true})
export default class System extends Component {

    render() {
        return (
            <div>
                <Card>
                    <CardHeader>License</CardHeader>
                    <CardBody>
                        <i>
                            <p>
                                Copyright (C) 2018 Manuel Fritsch
                                The software is free to use. It's permitted to modify the software for personal use.
                                It's not permitted to distribute the modified software. Modification can be
                                distributed via the official CraftBeerPi release only. It's not permitted to distribute
                                the software in a commercial way without permission.
                            </p>
                            <p>
                                THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED,
                                INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
                                FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
                                IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
                                CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
                                TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
                                SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
                            </p>
                        </i>
                    </CardBody>
                </Card>


            </div>
        )
    }
}