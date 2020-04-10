import {StyleSheet, Text, View} from 'react-native';
import * as React from 'react';
import {legacyTheme} from '../../../constants/theme';
import {TouchableRipple} from 'react-native-paper';
import {textStyles} from '../../../constants/text-styles';
import {CommitCardPushPull} from './commit-card-push-pull';
import dayjs from 'dayjs';
import {GitLogCommit} from '../../../services/git/gitLog';
import {getCommitHeaderBody} from '../../../services/git/getCommitHeaderBody';
import {SharkProfilePic} from '../../shark-profile-pic/shark-profile-pic';

interface CommitCardProps {
  commit: GitLogCommit;
}
export const CommitCard = ({commit}: CommitCardProps) => {
  const {title, message} = getCommitHeaderBody({commit});

  const needsPulling = !!(Math.floor(Math.random() * 10) < 5);
  const needsPushing = !!(Math.floor(Math.random() * 10) < 7);
  const {dateStr, timeStr} = React.useMemo(() => {
    const dayjsTimestampe = dayjs(commit.author.timestamp);
    return {
      dateStr: dayjsTimestampe.format('D MMM YYYY'),
      timeStr: dayjsTimestampe.format('h:mm A'),
    };
  }, [commit.author.timestamp]);

  const blueStyle = needsPushing ? styles.accentText : {};

  return (
    <TouchableRipple
      style={styles.commitContainer}
      onPress={() => {}}
      rippleColor={legacyTheme.colors.outlineColor}>
      <View>
        <View style={styles.commitHeading}>
          <SharkProfilePic size={22} />
          <Text style={[styles.developerName, blueStyle]}>
            {commit.author.name}
          </Text>
          <CommitCardPushPull
            needsPulling={needsPulling}
            needsPushing={needsPushing}
          />
          <View style={{flexGrow: 1}} />
          <Text style={styles.timeStr}>
            {dateStr} • {timeStr}
          </Text>
        </View>
        <Text style={[styles.commitHeaderTxt, blueStyle]}>{title}</Text>
        {!!message && <Text style={styles.commitBody}>{message}</Text>}
      </View>
    </TouchableRipple>
  );
};

const styles = StyleSheet.create({
  commitContainer: {
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 16,
  },
  commitHeading: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  developerName: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderWidth: 1,
    borderColor: legacyTheme.colors.outlineColor,
    borderRadius: legacyTheme.lessRoundness,
    marginHorizontal: 8,
    color: legacyTheme.colors.on_surface_light,
    ...textStyles.caption_01,
  },
  timeStr: {
    color: legacyTheme.colors.on_surface_secondary_light,
    ...textStyles.caption_02,
  },
  commitHeaderTxt: {
    color: legacyTheme.colors.on_surface_light,
    ...textStyles.callout,
    fontWeight: 'bold',
  },
  accentText: {
    color: legacyTheme.colors.accent,
  },
  commitBody: {
    color: legacyTheme.colors.on_surface_secondary_light,
    ...textStyles.body_02,
  },
});
