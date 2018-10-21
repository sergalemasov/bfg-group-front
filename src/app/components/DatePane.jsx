import React, {Component} from 'react';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { fromDatePicker, toDatePicker, getOffsetInHours } from 'app/converters';


const styles = theme => ({
    heading: {
        padding: `${theme.typography.pxToRem(10)} ${theme.typography.pxToRem(20)} 0`,
        fontSize: theme.typography.pxToRem(20),
        fontWeight: theme.typography.fontWeightRegular,
        textAlign: 'center'
    },
    container: {
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    textField: {
        marginLeft: theme.typography.pxToRem(20)
    },
    input: {
        fontSize: theme.typography.pxToRem(14)
    }
});

class DatePaneComponent extends Component {
    state = {
        lastSearchDate: null,
        searchDate: null
    };

    constructor() {
        super();
        this.onDateChange = this.onDateChange.bind(this);
        this.onSearchClick = this.onSearchClick.bind(this);
    }

    componentDidUpdate() {
        if (!this.state.lastSearchDate) {
            this.setState({
                lastSearchDate: this.props.defaultSearchDate
            });
        }
    }

    render() {
        const {
            classes,
            defaultSearchDate
        } = this.props;

        return (
            <div>
                <Typography className={classes.heading}>
                    5 the most popular questions on Stack Overflow containing
                    "react-redux" in the title.
                </Typography>
                <form className={classes.container} noValidate>
                    {this.state.searchDate
                        ? <Button variant="outlined"
                                size="small"
                                onClick={this.onSearchClick}>
                                Search
                          </Button>
                        : ''
                    }
                    <TextField
                        id="date"
                        label="From"
                        type="date"
                        defaultValue={toDatePicker(defaultSearchDate)}
                        className={classes.textField}
                        InputProps={{
                            classes: {
                                input: classes.input
                            }
                        }}
                        InputLabelProps={{
                            shrink: true
                        }}
                        onChange={this.onDateChange}
                    />
                </form>
            </div>
        );
    }

    onDateChange(event) {
        if (!(event && event.target && event.target.value)) {
            return;
        }

        let newSearchDate = fromDatePicker(event.target.value);

        if (!this.isDateValid(newSearchDate) ||
            this.state.lastSearchDate.toString() === newSearchDate.toString()) {
            newSearchDate = null;
        }

        this.setState({
            searchDate: newSearchDate
        });
    }

    isDateValid(date) {
        const now = new Date();
        const hoursOffset = getOffsetInHours(now);
        const epoch = new Date(1970, 0, 1, hoursOffset);

        return date <= now && date >= epoch;
    }

    onSearchClick() {
        const currentSearchDate = this.state.searchDate;

        this.setState({
            lastSearchDate: currentSearchDate,
            searchDate: null
        });

        this.props.search(currentSearchDate);
    }
}

DatePaneComponent.propTypes = {
    classes: PropTypes.object.isRequired,
    search: PropTypes.func.isRequired,
    defaultSearchDate: PropTypes.instanceOf(Date).isRequired
}

export const DatePane = withStyles(styles)(DatePaneComponent);
