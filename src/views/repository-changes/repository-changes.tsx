import * as React from 'react';
import {StyleSheet, View, ScrollView} from 'react-native';
import {FileChangeListItemWithCheckbox} from '../../components/file-change-list-item/file-change-list-item-with-checkbox';

import {RepoContext} from '../../constants/repo-context';
import {ChangesArrayItem, getRepoStatus} from '../../services/git';
import {SubheaderWithButton} from '../../components/subheaders/subheader-with-button';

export const RepositoryChanges = () => {
  const {repo} = React.useContext(RepoContext);
  const [changes, setChanges] = React.useState<ChangesArrayItem[]>([]);

  const getUpdate = React.useCallback(() => {
    if (!repo) {
      return;
    }
    getRepoStatus(repo.path).then(newFiles => {
      const onlyChangedFiles = newFiles.filter(
        file => file.fileStatus !== 'unmodified',
      );
      setChanges(onlyChangedFiles);
    });
  }, [repo]);

  React.useEffect(() => {
    getUpdate();
  }, [getUpdate]);

  return (
    <>
      <View style={styles.container}>
        <SubheaderWithButton
          buttonText={'Stage All'}
          calloutText={'Unstaged'}
          onButtonClick={() => {}}
        />
        <ScrollView style={styles.changesList}>
          {changes.map(props => {
            return (
              <FileChangeListItemWithCheckbox
                isChecked={false}
                key={props.fileName}
                {...props}
              />
            );
          })}
        </ScrollView>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
  },
  headingText: {
    marginBottom: 16,
    fontSize: 48,
  },
  fabview: {
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    bottom: 16,
  },
  changesList: {
    paddingHorizontal: 16,
  },
  fab: {
    margin: 0,
    padding: 0,
    left: 0,
  },
});
