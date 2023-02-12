/**
 * import { makeStyles } from "@material-ui/core";

export default makeStyles ( (theme) => ({
    appBar: {
        borderRadius: 15,
        margin: '30px 0',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
      },

      heading: {
        color: 'rgba(0,183,255, 1)',
      },

      image: {
        marginLeft: '30px',
      },
      
      // how do this only on mobile?, material ui offer something called break points (there are simply media queries)
      [theme.breakpoints.down('sm')]: {
        mainContainer: {
          flexDirection: "column-reverse",
        }
      }

}));

// makeStyles is an arrow function returns an 'object'
 */