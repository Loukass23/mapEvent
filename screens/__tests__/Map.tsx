import React from 'react';
import { render } from '@testing-library/react-native';
import Map from '../Map';
import renderer from 'react-test-renderer';



describe('TestMap', () => {
    it('renders correctly', () => {
        const map = renderer.create(
            <Map />
        ).toJSON();
        expect(map).toMatchSnapshot();
    });
});

jest.mock('react-native-maps', () => {
    const React = require.requireActual('react');
    const MapView = require.requireActual('react-native-maps');

    class MockCallout extends React.Component {
        render() {
            return React.createElement('Callout', this.props, this.props.children);
        }
    }

    class MockMarker extends React.Component {
        render() {
            return React.createElement('Marker', this.props, this.props.children);
        }
    }

    class MockMapView extends React.Component {
        render() {
            return React.createElement('MapView', this.props, this.props.children);
        }
    }

    MockCallout.propTypes = MapView.Callout.propTypes;
    MockMarker.propTypes = MapView.Marker.propTypes;
    MockMapView.propTypes = MapView.propTypes;
    MockMapView.Marker = MockMarker;
    MockMapView.Callout = MockCallout;
    return MockMapView;
}); 