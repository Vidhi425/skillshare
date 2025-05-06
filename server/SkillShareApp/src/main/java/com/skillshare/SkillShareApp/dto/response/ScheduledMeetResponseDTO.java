package com.skillshare.SkillShareApp.dto.response;

import java.util.Date;
import java.util.List;

import com.skillshare.SkillShareApp.enums.Mode;

import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.experimental.SuperBuilder;

@EqualsAndHashCode(callSuper = true)
@Data
@SuperBuilder
public class ScheduledMeetResponseDTO extends ResponseDTO {
    private List<ScheduledMeetDTO> scheduledMeets;

    @Data
    @Builder
    public static class ScheduledMeetDTO {
        private String mentorName;
        private String menteeName;
        private String title;
        private String description;
        private String topic;
        private Mode mode;
        private String mentorProfileImg;
        private Date meetDate;
        private String meetLink;
    }
}