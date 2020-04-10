import * as React from 'react';
import {View, StyleSheet} from 'react-native';
import {Button} from 'react-native-paper';
import {legacyTheme} from '../../constants/theme';
import {AppDialog} from '../dialog/dialog';
import {ErrorMessageBox} from '../error-message-box/error-message-box';
import {Repo} from 'src/entities';
import {deleteRepo} from '../../services/git/deleteRepo';

interface DeleteRepositoryDialogProps {
  onDismiss: (didUpdate: boolean) => void;
  visible: boolean;
  repo: Repo;
}
export const DeleteRepositoryDialog = ({
  onDismiss,
  visible,
  repo,
}: DeleteRepositoryDialogProps) => {
  const [errorStr, setErrorStr] = React.useState('');

  const parentOnDismiss = (bool: boolean) => {
    setErrorStr('');
    onDismiss(bool);
  };

  const deleteRepoLocal = () => {
    deleteRepo(repo)
      .then(() => {
        setErrorStr('');
        parentOnDismiss(true);
      })
      .catch(e => {
        setErrorStr(e.message || e);
      });
  };

  return (
    <AppDialog
      visible={visible}
      onDismiss={() => parentOnDismiss(false)}
      title={'Delete repository?'}
      text={'Files will remain in your device.'}
      main={
        <>
          {!!errorStr && (
            <ErrorMessageBox style={styles.errorBox} message={errorStr} />
          )}
        </>
      }
      actions={
        <View style={styles.buttonContainer}>
          <Button
            onPress={() => deleteRepoLocal()}
            mode="contained"
            color={legacyTheme.colors.change_removal_light}
            style={styles.fullWidthBtn}>
            Delete
          </Button>
          <Button
            onPress={() => parentOnDismiss(false)}
            mode="outlined"
            color={legacyTheme.colors.accent}
            style={[styles.cancelBtn, styles.fullWidthBtn]}>
            Cancel
          </Button>
        </View>
      }
    />
  );
};

const styles = StyleSheet.create({
  errorBox: {
    marginTop: 8,
  },
  textInput: {
    marginTop: 8,
    paddingVertical: 16,
    paddingHorizontal: 12,
    fontSize: 16,
    lineHeight: 24,
    borderWidth: 1,
    borderColor: legacyTheme.colors.outlineColor,
    borderRadius: legacyTheme.roundness,
  },
  cancelBtn: {
    borderColor: legacyTheme.colors.outlineColor,
    borderWidth: 2,
    marginTop: 8,
  },
  buttonContainer: {
    flexDirection: 'column',
    width: '100%',
  },
  fullWidthBtn: {
    width: '100%',
  },
});
