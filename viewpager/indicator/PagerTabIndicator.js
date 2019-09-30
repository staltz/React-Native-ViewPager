/**
 * Created by tangzhibin on 16/5/11.
 */

'use strict'
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, View, ViewPropTypes, TouchableOpacity } from 'react-native'
import IndicatorViewPager from '../IndicatorViewPager'

export default class PagerTabIndicator extends Component {
    static propTypes = {
        ...ViewPropTypes,
        initialPage: PropTypes.number,
        pager: PropTypes.instanceOf(IndicatorViewPager),
        tabs: PropTypes.arrayOf(PropTypes.shape({
            normal: PropTypes.any,
            selected: PropTypes.any
        })).isRequired,
        itemStyle: ViewPropTypes.style,
        selectedItemStyle: ViewPropTypes.style,
        changePageWithAnimation: PropTypes.bool,
    }

    static defaultProps = {
        tabs: [],
        changePageWithAnimation: true
    }

    state = {
        selectedIndex: this.props.initialPage
    }

    render () {
        let {
            tabs, pager, style, itemStyle, selectedItemStyle, onSelect,
        } = this.props
        if (!tabs || tabs.length === 0) return null

        let tabsView = tabs.map((tab, index) => {
            let isSelected = this.state.selectedIndex === index
            return (
                <TouchableOpacity
                    style={[styles.itemContainer, isSelected ? selectedItemStyle : itemStyle]}
                    activeOpacity={0.6}
                    key={index}
                    onPress={() => {
                        if (!isSelected){
                            if (this.props.changePageWithAnimation)
                                pager.setPage(index);
                            else pager.setPageWithoutAnimation(index);
                        }
                        if (onSelect) {
                            onSelect(index);
                        }
                    }}
                >
                    {isSelected ? tab.selected : tab.normal}
                </TouchableOpacity>
            )
        })
        return (
            <View style={[styles.container, style]} >
                {tabsView}
            </View>
        )
    }

    onPageSelected(e) {
        if (this.props.onSelect) {
            this.props.onSelect(e.position);
        }
        this.setState({selectedIndex: e.position})
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
    },
    itemContainer: {
        alignItems: 'center',
    flex: 1,
    },
});
