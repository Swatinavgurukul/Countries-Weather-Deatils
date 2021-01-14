import React, { Component } from 'react';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import MUIDataTable from "mui-datatables";
import { MuiThemeProvider } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Button from 'muicss/lib/react/button';
import { createMuiTheme } from '@material-ui/core/styles';
import "./style.css"
import CapitalWeather from "./CapitalWeather"


 

class ListofContries extends Component {
  
  getMuiTheme = () => createMuiTheme({
    overrides: {
      
      MUIDataTableBodyCell: {
        root: {
          backgroundColor: "lightslategray"
        }
      },
      
    }
  })

    constructor(props) {
        super(props);
        this.state = {
            value: '',
            ContriesList: [],
            search:false
        };
    }

    componentDidMount() {

        fetch('https://restcountries.eu/rest/v2')
            .then( (response) =>{ return response.json(); })
            .then( (data) =>{
                this.setState({
                    ContriesList:data
                    })
            })
}

searcHandler = () => {
   this.setState({search:true})
}

OnInputChangeHandler = async (e) => {
  await this.setState({ value: e.target.value });

  if (this.state.value.length ===0){
    this.setState({
      search :false
    })
  }
}
    render() {

      const columns = [
        {
         name: "name",
         label: "Name",
         options: {
          filter: true,
          sort: true,
         }
        },
        {
         name: "capital",
         label: "capital",
         options: {
          filter: true,
          sort: false,
         }
        },
        {
         name: "population",
         label: "population",
         options: {
          filter: true,
          sort: false,
         }
        },
        {
         name: "latlng",
         label: "latlng",
         options: {
          filter: true,
          sort: false,
         }
        },
        {
          name: "flag",
          label: "flag",
          options: {
           filter: true,
           sort: false,
           customBodyRender: (value) => {
            return (
              <img style={{ with: 40, height: 40 }}
              src={value}
              alt="NAtional Flag"
              />
              )
            }
          }
         },
         {
          name: "name",
          label: "capital info button",
          options: {
          filter: true,
          sort: false,
          customBodyRender: (value) => {
            return (
              <CapitalWeather
              CountryName={value}
              />
              )
            }
          }
        }
       ];
      
       const options = {
        selectableRows: false,
        filter: false,
        search: false,
        download: false,
        viewColumns: false,
        print: false,
      }

      const ShowingList = this.state.ContriesList.filter(item => item.name.toLowerCase().includes(this.state.value.toLowerCase()))
      
        return (
         
            <Container maxwidth="md">
            <div className="add-item">
              <input 
              type="text" 
              className="add-item__input"
              placeholder="enter a country name"
              value={this.state.value}
              onChange={this.OnInputChangeHandler}
              ></input>
                
              {this.state.value  ? 
              <Button color="primary" 
              disabled={!this.state.value} 
              className="add-item__button"
              onClick={this.searcHandler}
              >Search</Button> 
              : null }
                
                

            <div style={{ textAlign: "center" }}>
              
                {this.state.ContriesList.length ? <Box my={2}>

                {this.state.value.length ? <Box my={2}>
                
                    
                  <MuiThemeProvider theme={this.getMuiTheme()}>
                    {this.state.value.length >0 && this.state.search ? 
                      <div>
                      <h1>List of Countries</h1>
                      <MUIDataTable 
                      data={ShowingList} 
                      columns={columns} 
                      options={options}
                      /> </div>: null
                    }
                      
                    </MuiThemeProvider>
                </Box> : ""}

                 </Box>: <Box my={2}>
                    <Typography style={{ color: "#0000FF", marginTop: 100, marginBottom: 250, fontSize: "x-large" }}>
                      null
                            
                    </Typography>
                  </Box>
    }
            
            </div>
            </div>
            </Container>
        );

        
    } 
    

}
export default ListofContries;