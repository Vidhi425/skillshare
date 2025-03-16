package com.skillshare.SkillShareApp.controller;

import com.skillshare.SkillShareApp.dto.request.AppointmentResponseRequestDTO;
import com.skillshare.SkillShareApp.service.Contract.ContractService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("mentor")
public class MentorController {

    @Autowired
    private ContractService contractService;

    @PostMapping("/appointment-respond")
    public ResponseEntity<?> handleAppointmentResponse(@RequestBody AppointmentResponseRequestDTO request) {
        System.out.println(request);
        return contractService.handleAppointmentResponse(request.getAppointmentId(), request.getIsAccepted(), request.getMeetingDetails());
    }
}
