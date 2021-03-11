using API.Entities;

namespace API.Interfaces
{
    public interface ITokenService
    {
        //for authentication purpose we create JWT tokens, so whenever we make a request we pass that token to the server
        // and in return the server pass the same token to the client
        // this token has a key I think taht helps in secure signing at server
        string CreateToken(AppUser user);
    }
}