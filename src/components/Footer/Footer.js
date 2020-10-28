import React from 'react';
import './Footer.css';

import Typography from '@material-ui/core/Typography';
import GitHubIcon from '@material-ui/icons/GitHub';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import { makeStyles } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';


const useStyles = makeStyles((theme) => ({
    root: {
      '& > svg': {
        margin: theme.spacing(2),
      },
      '& > * + *': {
        marginLeft: theme.spacing(2),
      }
    },
  }));

function Footer() {
    const classes = useStyles();

    return(
        <div id="footer">
            <div className={classes.root}>
              <Link href="https://github.com/carlamontani" target="_blank">
                <GitHubIcon/>
              </Link>
              <Link href="https://www.linkedin.com/in/carla-montani-7b3231112/" target="_blank">
                <LinkedInIcon/>  
              </Link>              
            </div>
            <div className="footer-text">
                <Typography variant="overline" display="block" gutterBottom>
                2020 loremlibrum | diseño y desarrollo de Carla Montani
                </Typography>
            </div>
        </div>
        
    )
}

export default Footer