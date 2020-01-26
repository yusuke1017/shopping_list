import React from 'react';
import { Link, withRouter } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import theme from '../Theme/ThemeProvider';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import Container from '@material-ui/core/Container';
import KitchenIcon from '@material-ui/icons/Kitchen';
import FastfoodIcon from '@material-ui/icons/Fastfood';
import ViewListIcon from '@material-ui/icons/ViewList';
import CheckIcon from '@material-ui/icons/Check';

const useStyles = makeStyles({
    bar: {
        left: 0,
        width: "100%",
        bottom: 0,
        zIndex: 1000,
        position: "fixed",
        textAlign: "center",
        background: theme.palette.secondary.main
    },
    root: {
        color: theme.palette.secondary.light,
        '&$selected': {
            color: theme.palette.primary.light
        }
    },
    selected: {},
});

function BottomBar() {
    const classes = useStyles();
    const path_map = [
        '/',
        '/dish',
        '/menu',
        '/list'
    ];
    let path_name = window.location.pathname;
    let now_value = path_map.indexOf(path_name);

    const [value, setValue] = React.useState(now_value);

    const nav_info = [
        { link_to: '/', label: '食材', icon: <KitchenIcon /> },
        { link_to: '/dish', label: '料理', icon: <FastfoodIcon /> },
        { link_to: '/menu', label: '献立', icon: <ViewListIcon /> },
        { link_to: '/list', label: 'リスト', icon: <CheckIcon /> }
    ]
    const buttons = nav_info.map((nav_info, index) => {
        return (
            <BottomNavigationAction
                label={nav_info.label}
                selected
                classes={{ root: classes.root, selected: classes.selected, }}
                icon={nav_info.icon}
                component={Link}
                to={nav_info.link_to}
            />
        );
    })

    return (
        <Container maxWidth="lg">
            <BottomNavigation
                value={value}
                onClick={() => {
                    path_name = window.location.pathname;
                    now_value = path_map.indexOf(path_name);
                    setValue(now_value);
                }}
                showLabels
                className={classes.bar}
                children={buttons}
            >
            </BottomNavigation>
        </Container>
    );
}
export default withRouter(BottomBar);