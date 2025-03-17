package com.skillshare.SkillShareApp.repo;

import com.skillshare.SkillShareApp.model.Contract;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ContractRepo extends JpaRepository<Contract, Long> {
}
