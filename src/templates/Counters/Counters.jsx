import React, { useCallback, useState, useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import './index.css';
import { Container } from 'react-bootstrap';
import CounterList from '../../components/Counters/CounterList';
import Footer from '../../components/Footer/Footer';
import Search from '../../components/Searcher/Searcher';
import CreateNewCounter from '../../components/Counters/CreateNewCounter';
import ExampleCounters from '../../components/Counters/ExampleCounters';
import { changeLoading } from '../../actions';
import Btn from '../../components/Btn/Btn';

const Counters = ({ counterStore, filteredCounters, createNewCounterModal, exampleCountersModal, exampleCounterName }) => {
    const dispatch = useDispatch();
    const [searching, setSearching] = useState(false);
    const counterList = <CounterList counters={searching ? filteredCounters : counterStore} />
    const newCounter = <CreateNewCounter />;
    const exampleCounters = <ExampleCounters />;

    const handleSearching = useCallback(() => {
        setSearching(!searching)
    })
    const refreshPage = () => {
        if (navigator.onLine === true) {
            window.location.reload()
        }
    }

    const handleConnection = () => {
        if (navigator.onLine === false) {
            dispatch(changeLoading(false))
            return <div className="no-connection text-center">
                <h4>Couldn’t load the counters</h4>
                <p>The Internet connection appears to be offline.</p>
                <Btn theme="main-light" title="Retry" onClick={refreshPage} />
            </div>
        } else {
            return counterStore.length > 0 ? counterList :
                <div className="no-counters text-center">
                    <h4>No counters yet</h4>
                    <p>“When I started counting my blessings, my whole life turned around.”—Willie Nelson</p>
                </div>
        }
    }

    useEffect(() => {
        handleConnection()
    }, [handleConnection])
    return (
        <>
            <Search onSearch={handleSearching} />
            <div className="counters">
                <Container className="container-counters">
                    {handleConnection()}
                </Container>
            </div>
            {createNewCounterModal === true ? newCounter : null}
            {exampleCountersModal === true ? exampleCounters : null}
            <Footer />
        </>
    )
}

const mapStateToProps = (state) => {
    return {
        counterStore: state.counterStore,
        filteredCounters: state.filteredCounters,
        createNewCounterModal: state.createNewCounterModal,
        exampleCountersModal: state.exampleCountersModal,
    }
}
export default connect(mapStateToProps)(Counters);