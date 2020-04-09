import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity
} from 'react-native';
import {Button} from '../../components/Button';
import {
  getTasks,
  removeTask,
  resetProps,
} from '../../store/branches/manageTasksBranch';
import {needReloadTasksList} from '../../store/branches/dataBranch';

class ManageTask extends Component {
  componentDidMount() {
    this.props.actions.getTasks();
    this.focusOnScreenManageTask = this.props.navigation.addListener('focus', this.focusOnScreenManageTask);
  }

  componentDidUpdate() {
    const {needReload} = this.props;
    if (needReload) {
      this.props.actions.getTasks();
    }
  }

  componentWillUnmount() {
    this.focusOnScreenManageTask();
  }

  focusOnScreenManageTask = () => {
    this.props.actions.getTasks();
  };

  onPressRemoveBtn = key => {
    this.props.actions.removeTask(key);
  };

  onPressEditBtn = key => {
    this.props.navigation.navigate('EditTask', {key: key});
  };

  renderTaskList = () => {
    const {tasksList} = this.props;

    if (tasksList.length) {
      const tasksListView = tasksList.map(i => {
        return (
          <View key={i} style={styles.task}>
            <View style={styles.taskTitle}>
              <Text>{i}</Text>
            </View>
            <View style={styles.editButton}>
              <Button onPress={() => this.onPressEditBtn(i)}>
                Редактировать
              </Button>
            </View>
            <View style={styles.removeButton}>
              <TouchableOpacity onPress={() => this.onPressRemoveBtn(i)}>
                <Image source={require('../../assets/img/remove_.png')} />
              </TouchableOpacity>
            </View>
          </View>
        );
      });
      return tasksListView;
    } else {
      return (
        <View style={styles.wrapTasks}>
          <Text>Список задач пуст</Text>
        </View>
      );
    }
  };

  render() {
    return (
      <ScrollView style={styles.wrapTasks}>{this.renderTaskList()}</ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  wrapTasks: {
    flex: 1,
    flexDirection: 'column',
    margin: 15,
  },
  task: {
    flex: 1,
    flexDirection: 'row',
    marginBottom: 10,
  },
  taskTitle: {
    flex: 2,
    marginTop: 3,
  },
  editButton: {
    flex: 2,
  },
  removeButton: {
    flex: 1,
    marginLeft: 10,
    paddingLeft: 30,
  },
});

const mapStateToProps = state => {
  return {
    tasksList: state.manageTaskReducer.tasksList,
    needReload: state.manageTaskReducer.needReload,
    error: state.manageTaskReducer.error,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    actions: {
      getTasks: () => {
        dispatch(getTasks());
      },
      removeTask: key => {
        dispatch(removeTask(key));
      },
      resetProps: () => {
        dispatch(resetProps());
      },
      needReloadTasksList: () => {
        dispatch(needReloadTasksList());
      },
    },
  };
};

export const ManageTaskScreen = connect(mapStateToProps, mapDispatchToProps)(ManageTask);
