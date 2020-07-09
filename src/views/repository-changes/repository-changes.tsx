import * as React from 'react';
import {StyleOfStagingContext} from '@constants';
import {ChangesArrayItem} from '@services';
import {useNavigation} from '@react-navigation/native';
import {
  StageSheetView,
  StageSplitView,
} from './components/staging-screen-options';
import {useSelector} from 'react-redux';
import {addToStaged, getGitStatus, removeFromStaged, RootState} from '@store';
import {useThunkDispatch} from '@hooks';
import {RepositoryHeader} from '@components/repository-header';
import {StyleSheet, View} from 'react-native';

export const RepositoryChanges = () => {
  const {repo} = useSelector((state: RootState) => state.repository);
  const {staged, unstaged} = useSelector((state: RootState) => state.changes);
  const dispatch = useThunkDispatch();

  const history = useNavigation();

  const {styleOfStaging} = React.useContext(StyleOfStagingContext);

  const useSplitView = styleOfStaging === 'split';

  const getUpdate = React.useCallback(() => {
    dispatch(getGitStatus());
  }, [dispatch]);

  React.useEffect(() => {
    getUpdate();
  }, [getUpdate]);

  const addToStagedLocal = async (changes: ChangesArrayItem[]) => {
    dispatch(addToStaged(changes)).then(({error}: any) => {
      if (error) console.error(error);
    });
  };

  const removeFromStagedLocal = async (changes: ChangesArrayItem[]) => {
    dispatch(removeFromStaged(changes)).then(({error}: any) => {
      if (error) console.error(error);
    });
  };

  const onCommit = React.useCallback(() => {
    history.navigate('CommitAction', {
      files: staged,
      updateFiles: getUpdate,
    });
  }, [history, staged, getUpdate]);

  return (
    <View style={styles.container}>
      <RepositoryHeader repo={repo} />
      {useSplitView ? (
        <StageSplitView
          addToStaged={addToStagedLocal}
          unstagedChanges={unstaged}
          removeFromStaged={removeFromStagedLocal}
          stagedChanges={staged}
          onCommit={onCommit}
        />
      ) : (
        <StageSheetView
          addToStaged={addToStagedLocal}
          unstagedChanges={unstaged}
          removeFromStaged={removeFromStagedLocal}
          stagedChanges={staged}
          onCommit={onCommit}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 1,
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
  },
});
