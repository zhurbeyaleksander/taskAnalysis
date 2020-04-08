import React, {Component} from 'react';
import {connect} from 'react-redux';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
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
          <View key={i} style={styles.wrapTasks}>
            <View style={styles.task}>
              <View style={styles.taskTitle}>
                <Text>{i}</Text>
              </View>
              <View style={styles.editButton}>
                <Button onPress={() => this.onPressEditBtn(i)}>
                  Редактировать
                </Button>
              </View>
              <View style={styles.removeButton}>
                <Button onPress={() => this.onPressRemoveBtn(i)}>X</Button>
              </View>
            </View>
          </View>
        );
      });
      return tasksListView;
    } else {
      return <Text>Список задач пуст</Text>;
    }
  };

  render() {
    return (
      <ScrollView>
        {this.renderTaskList()}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  wrapTasks: {
    flex: 1,
    flexDirection: 'column',
  },
  task: {
    flex: 1,
    flexDirection: 'row',
  },
  taskTitle: {
    flex: 2,
  },
  editButton: {
    flex: 2,
  },
  removeButton: {
    flex: 1,
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
