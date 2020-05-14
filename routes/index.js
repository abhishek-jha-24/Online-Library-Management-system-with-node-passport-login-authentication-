const express = require('express');
const router = express.Router();
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');

const datasss = require('../models/datas');



// Welcome Page
router.get('/', forwardAuthenticated, (req, res) => res.render('welcome'));

// Dashboard
router.get('/dashboard', ensureAuthenticated, (req, res) =>
  res.render('dashboard', {
    user: req.user
  })
);

router.get('/insert', function(req, res, next){
  res.render('insert', {title: 'aaaaa'});
 
});



router.post('/insert', function(req, res, next){
  let errors = [];

  var item={
    BOOK_code: req.body.BOOK_code,
    BOOK_name: req.body.BOOK_name,
    Author: req.body.Author,
   

    


  };
  if (!item.BOOK_code || !item.BOOK_name || !item.Author) {
    errors.push({ msg: 'Please enter all fields' });
  }
  if (errors.length > 0) {
    res.render('insert', {
      errors,
      item
    });
  } else {
    datasss.findOne({ BOOK_code: item.BOOK_code  }).then(user => {
      if (user) {
        errors.push({ msg: 'Book Code previously exists' });
        res.render('insert', {
          errors,
          item
        });
      } else {
        const data = new datasss(item);
        data
          .save()
            .then(user => {
                req.flash(
                  'success_msg',
                  'book inserted successfully...'
                );
                res.redirect('/insert');
              })
              .catch(err => console.log(err));
      }
    });
  }
});


  


router.get('/get', function(req, res, next){
	datasss.find({}, function(err, doc){
		if (err){
			res.send(err)
		} else {
			res.render('get', {
				items: doc
			})
		}
	});
});

router.get('/update', function(req, res, next){
  res.render('update', {title: 'aaaaa'});
  
});



router.post('/update', function(req, res, next){
  let errors = [];

  var BOOK_code = req.body.BOOK_code;
  var item={
    BOOK_code: req.body.BOOK_code,
    Book_name: req.body.Book_name,
    Author: req.body.Author,




    


  };


  
  datasss.findOne({BOOK_code: BOOK_code}, function(err, doc){
  	if (err){
  		console.error('no, entry found');
  	}
  	doc.BOOK_code = req.body.BOOK_code;
  	doc.BOOK_name = req.body.BOOK_name;
  	doc.Author = req.body.Author;
  	doc.save();
    req.flash(
      'success_msg',
      'book Updated successfully...'
    );
    res.redirect('/update');


  })

});


router.get('/find', function(req, res, next){
  res.render('find', {title: 'aaaaa'});
  
});

router.post('/find', function(req, res, next){
  res.redirect('/find');
  var BOOK_code = req.body.BOOK_code;
  

 
  


});


router.get('/get-data/:BOOK_code', function(req, res, next){
  var zzz = req.params.BOOK_code;
  console.log(zzz)


  console.log('yes were in')


  
  var resultarray = [];
  datasss.findOne({BOOK_code: zzz}, function(err, doc){
		if (err){
			res.send(err)
		} else {
			res.render('get-data', {
				items: doc
			})
		}
	});
  
});


router.get('/Issue', function(req, res, next){
  res.render('Issue', {title: 'aaaaa'});
  
});

router.post('/Issue', function(req, res, next){
  res.redirect('/Issue');
  var resultarray = [];

  var BOOK_code = req.body.BOOK_code;

  var Roll_Id = req.body.Roll_Id;


  
  datasss.findOne({BOOK_code: BOOK_code}, function(err, doc){
  	if (err){
  		console.error('no, entry found');
  	}
  	doc.BOOK_code = req.body.BOOK_code;
  	doc.Book_details = 'issued',
  	doc.Roll_Id = req.body.Roll_Id;
    doc.Roll_Id_previous = req.body.Roll_Id;
    doc.Book_details_previous = 'issued',
    
    doc.Issuedate = Date.now();
    
  	
  	doc.save();
    

    function myFunc(arg) {
      if (!doc.Book_Renew){
        doc.Book_details = 'Not Available',
        console.log(doc.Book_details)
        doc.Roll_Id = null;
        doc.save();

      } else{
        doc.save();
      }
      
      
    }

    setTimeout(myFunc, 60000, doc);




  })
  
 
  


});



router.get('/view-details/:Roll_Id', function(req, res, next){
  var zzz = req.params.Roll_Id;
  console.log(zzz)


  console.log('yes were in')

  datasss.find({Roll_Id: zzz}, function(err, doc){
		if (err){
			res.send(err)
		} else {
			res.render('viewdetails', {
				items: doc
			})
		}
	});
  

});





router.get('/Renew/:BOOK_code', function(req, res, next){
  
  var zzz = req.params.BOOK_code;
  console.log(zzz)
  
  var resultarray = [];


  
  datasss.findOne({BOOK_code: zzz}, function(err, doc){
    if (err){
      console.error('no, entry found');
    }
    doc.Book_Renew = true;

    doc.Book_details = doc.Book_details_previous;
    doc.Roll_Id = doc.Roll_Id_previous;
    console.log(doc.Roll_Id);
    doc.Issuedate = Date.now();
    doc.save();
    function myFunc(arg) {
      doc.Book_details = 'Not Available',
      console.log(doc.Book_details)
      doc.Roll_Id = null;
      doc.save();
      res.end()
      
    }

    setTimeout(myFunc, 60000, doc);
    res.end();




  })


  
 
  


});




router.get('/Return/:BOOK_code', function(req, res, next){
  
  var zzz = req.params.BOOK_code;
  console.log(zzz)
  
  var resultarray = [];


  
  datasss.findOne({BOOK_code: zzz}, function(err, doc){
    if (err){
      console.error('no, entry found');

    }
    doc.Book_Returned = true;
    doc.Book_details = 'available';
    console.log(doc.Book_details);
    doc.Roll_Id = null;
    doc.save();
    res.end();



  })


  
 
  


});



router.get('/Help', function(req, res, next){
  res.render('help');
 
});




module.exports = router;