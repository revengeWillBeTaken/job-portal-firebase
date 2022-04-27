import React,{ useState } from 'react'
import {Box,Button,Select,MenuItem,makeStyles,CircularProgress} from '@material-ui/core'

const useStyle = makeStyles({
    wrapper:{
        backgroundColor:"#fff",
        display:"flex",
        boxShadow:"0px 1px 5px rgba(0,0,0,0.1)",
        borderRadius:"5px",
        "& > *":{
            flex:1,
            height:"45px",
            margin:"8px"
        },
    }
})

const SearchBar = (props) => { 
    const [loading,setLoading] = useState(false);
    const [jobSearch,setJobSearch] = useState({
        jobType:"Full time",
    })

    const handleChange = (e) =>{
        e.persist();
        setJobSearch(oldState =>({
            ...oldState,
            [e.target.name]:e.target.value,
        }));
    };
    const search =async() =>{
        setLoading(true);
        await props.fetchJobsCustom(jobSearch);
        setLoading(false);
    }
    console.log(jobSearch);
    const classes = useStyle();

    return (
      <Box p={2} mt={-5} mb={2} className={classes.wrapper}>
          <Select onChange={handleChange} value={jobSearch.jobType} name="jobType" disableUnderline variant="filled" defaultValue="Full time">
              <MenuItem value="Full time">Full time</MenuItem>
              <MenuItem value="Part time">Part time</MenuItem>
              <MenuItem value="Contract">Contract</MenuItem>
          </Select>

         
          <Button 
            disabled={loading} 
            variant="contained" 
            color="primary" 
            disableElevation
            onClick={search}
          >
            {loading ? (
                        <CircularProgress color="secondary" size={22}/>
                    ) : (
                        "Search"
            )}
          </Button>
      </Box>
    )
}

export default SearchBar

