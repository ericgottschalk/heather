import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

const styles = {
  card: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
};

function MediaCard(props) {
  const { classes } = props;
  return (
    <Card className={classes.card} onClick={() => wundow.location = '/project/'+ classes.id }>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={classes.coverUrl}
          title={classes.title}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
          {classes.title}
          </Typography>
          <Typography component="p">
           {classes.description}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

MediaCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MediaCard);