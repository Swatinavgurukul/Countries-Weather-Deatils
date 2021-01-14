import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Dialog from '@material-ui/core/Dialog';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import "./style.css"
class CapitalWeather extends Component {

    constructor(props) {
        super(props);
        this.state = {
            List: [],
            dailogOpen: false
        };
    }

    fetchdata = () => {
        const { CountryName } = this.props;
        fetch(`http://api.weatherstack.com/current?access_key=cc4d37ded5d706e23d86647a0ed4f816&query=${CountryName}`)
            .then((response) => { return response.json(); })
            .then((data) => {
                this.setState({
                    List: data.current,
                    dailogOpen: true
                })
            })
            .catch((e) =>
                console.log(e)
            )
    }
    handleClose = () => {
        this.setState({
            dailogOpen: false
        })
    };
    render() {
        const { CountryName } = this.props;
        return (

            <div>
                <Button style={{ marginTop: "7" }} variant="contained" className="add-item__button" color="primary" onClick={this.fetchdata}  >
                    capital info
                </Button>
                <Dialog open={this.state.dailogOpen}>
                    <Box my={2}>
                        <Typography style={{ padding: 20, background: "aliceblue" }} >
                            {CountryName} Weather Details
                    </Typography>
                    </Box>
                    {this.state.List ? <Box my={2}>
                        <Grid container xs={12} style={{ padding: 10, background: "mistyrose" }} component="main" maxWidth="xs">
                            <Grid item xs={3} style={{ padding: 10 }}>
                                Temperature<br></br>{this.state.List.temperature}
                            </Grid>
                            <Grid item xs={3} style={{ padding: 10 }}>
                                Weather Icons<br></br>
                                <img
                                    src={this.state.List.weather_icons}
                                    style={{ height: 50, width: 35 }}
                                    alt=""
                                />
                            </Grid>
                            <Grid item xs={3} style={{ padding: 10 }}>

                                Wind Speed<br></br>{this.state.List.wind_speed}

                            </Grid>
                            <Grid item xs={3} style={{ padding: 10 }}>
                                Precip<br></br>{this.state.List.precip}
                            </Grid>

                        </Grid>
                    </Box> : <Box >
                            <Typography style={{ color: "#0000FF", textAlign: "center", marginBottom: 250, fontSize: "x-large" }}>
                                Going to update
                    </Typography>
                        </Box>
                    }
                    <Button style={{ background: "silver" }} onClick={this.handleClose}>close</Button>
                </Dialog>
            </div>
        );
    }

}
export default (CapitalWeather);