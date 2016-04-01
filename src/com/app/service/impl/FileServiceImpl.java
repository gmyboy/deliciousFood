package com.app.service.impl;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.dao.SuperBaseDao;
import com.app.model.Role;
import com.app.model.User;
import com.app.service.FileService;
import com.app.service.RoleService;

@Service
public class FileServiceImpl implements FileService{
	
	private Logger logger = Logger.getLogger(getClass());

	@Autowired
	private SuperBaseDao superBaseDao;
	
	@Autowired
	private SuperBaseDao<User> userDao;
	
	@Autowired
	private SuperBaseDao<Role> roleDao;
	
	@Autowired
	private RoleService roleService;
	
	
}
