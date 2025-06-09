package com.hospital.management.service;


import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hospital.management.dao.User;
import com.hospital.management.error.GlobalException;
import com.hospital.management.repository.UserRepository;

@Service
public class UserServiceImp implements UserService{
	
	@Autowired
	private UserRepository userRepository;
	
	
	@Override
    public User getUserById(Integer userId) {
        return userRepository.findById(userId)
            .orElseThrow(() -> new RuntimeException("User not found"));
    }
	
	@Override
	public List<User> getAllUsers(){
		return userRepository.findAll();
	}
	
    @Override
    public Optional<User> getUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    @Override
    public User addUser(User user) {
    	return userRepository.save(user);
    }
    
    @Override
    public void deleteUser(Integer id) {
    	userRepository.deleteById(id);
    }

	@Override
	public List<User> addUsers(List<User> users) {
		return userRepository.saveAll(users);
	}

	@Override
	public List<User> findUsersByName(String name) throws GlobalException {
		List<User> users = userRepository.findUsersByName(name);
		if(users.isEmpty()) {
			throw new GlobalException("No User with Name " + name);
		}
		return users;
	}

	@Override
	public User findUserByEmail(String email) throws GlobalException {
		User u = userRepository.findUserByEmail(email);
		if(u==null) {
			throw new GlobalException("No User found with email /'" + email + "/'");
		}
		return u;
	}

	@Override
	public User updateUser(Integer uid, User user) throws GlobalException {
		User existingUser = userRepository.findUserById(uid);
		if(existingUser==null) {
			throw new GlobalException("Existing User Not Found!");
		}
		existingUser.setDateOfBirth(user.getDateOfBirth());
		existingUser.setEmail(user.getEmail());
		existingUser.setFirstName(user.getFirstName());
		existingUser.setMiddleName(user.getMiddleName());
		existingUser.setLastName(user.getLastName());
		existingUser.setPhone(user.getPhone());
		existingUser.setPhotoURL(user.getPhotoURL());
		return userRepository.save(existingUser);
	}

}
