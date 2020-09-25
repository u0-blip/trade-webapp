import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';

const styles = (theme) => ({
    root: {
        padding: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        width: 400,
    },
    input: {
        marginLeft: theme.spacing(1),
        flex: 1,
    },
    iconButton: {
        padding: 10,
        color: 'gray',
    },
    divider: {
        height: 28,
        margin: 4,
    },
});



class SearchBar extends Component {
    constructor() {
        super();
        this.state = {
            query: '',
            errors: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    // componentWillReceiveProps(nextProps) {
    //     this.setState({ errors: nextProps.UI.errors });
    // }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
        if (this.state.errors.length > 0) {
            this.setState({ errors: '' })
        }
    }

    handleSubmit(event) {
        event.preventDefault();
        if (this.state.query.length === 0) {
            this.setState({ errors: 'Search cannot be empty!' })
            return
        }
        this.props.history.push(`/search/${encodeURIComponent(this.state.query)}`)
    }

    render() {
        const classes = this.props.classes;
        const loading = this.props.UI.loading;
        return (
            <Paper component="form" className={classes.root}>
                <IconButton className={classes.iconButton} aria-label="menu">
                    <MenuIcon />
                </IconButton>
                <InputBase
                    className={classes.input}
                    name='query'
                    placeholder="Search people, keywords..."
                    inputProps={{ 'aria-label': 'search' }}
                    value={this.state.query}
                    onChange={this.handleChange}
                    error={this.state.errors.length > 0}
                    onSubmit={this.handleSubmit}
                />
                <IconButton type="submit" className={classes.iconButton} aria-label="search"
                    disabled={loading}
                    onClick={this.handleSubmit}>
                    <SearchIcon />
                </IconButton>
            </Paper>
        );
    }
}

SearchBar.propTypes = {
    user: PropTypes.object.isRequired,
};

const mapActiontoProps = {
}
const mapStateToProps = (state) => ({
    UI: state.UI,
    user: state.user
});



export default connect(mapStateToProps, mapActiontoProps)(withStyles(styles)(withRouter(SearchBar)));